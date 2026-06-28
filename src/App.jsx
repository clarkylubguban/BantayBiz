import React, { useMemo, useState } from "react";
import { dashboardContent, staffCloseDay, staffFormScreens } from "./data";
import { Dashboard, OwnerDashboard, SalaryDashboard, StaffDashboard } from "./app/Dashboards";
import { ModeSelection } from "./app/ModeSelection";
import {
  InviteCodeSheet,
  NotificationSheet,
  OwnerDailyCloseSheet,
  OwnerProofSheet,
  OwnerStaffSheet,
  OwnerSummarySheet,
  SalarySheet,
  StaffActionSheet,
  StaffCloseDaySheet
} from "./app/Sheets";
import { money, parseMoney, Toast, todayText } from "./app/utils";
import "./styles.css";

function App() {
  const [selectedScreen, setSelectedScreen] = useState("mode-selection");
  const [activeSheet, setActiveSheet] = useState(null);
  const [toast, setToast] = useState("");
  const [reviewState, setReviewState] = useState("pending");
  const [proofState, setProofState] = useState("");
  const [staffNote, setStaffNote] = useState(staffCloseDay.note);
  const [staffData, setStaffData] = useState({
    sales: [{ amount: 12450, note: "Today so far", payment: "Cash", date: todayText }],
    expenses: [{ amount: 3890, note: "Supplies", category: "Store", date: todayText }],
    receipts: [{ amount: 320, note: "Supplies receipt", date: todayText }],
    closeSubmitted: false
  });
  const [staffForm, setStaffForm] = useState({
    amount: "0",
    payment: "Cash",
    category: "Food",
    note: "",
    date: todayText
  });

  const staffTotals = useMemo(
    () => ({
      sales: staffData.sales.reduce((sum, item) => sum + item.amount, 0),
      expenses: staffData.expenses.reduce((sum, item) => sum + item.amount, 0),
      receipts: staffData.receipts.length
    }),
    [staffData]
  );
  const dynamicStaffContent = useMemo(
    () => ({
      ...dashboardContent.staff,
      metrics: [
        {
          ...dashboardContent.staff.metrics[0],
          value: money(staffTotals.sales),
          detail: `${staffData.sales.length} sale entries`
        },
        {
          ...dashboardContent.staff.metrics[1],
          value: money(staffTotals.expenses),
          detail: `${staffData.expenses.length} expense entries`
        },
        {
          ...dashboardContent.staff.metrics[2],
          value: String(staffTotals.receipts),
          detail: "Uploaded today"
        }
      ],
      statuses: [
        { label: "Staff View", color: "pink" },
        { label: staffData.closeSubmitted ? "Close submitted" : "Closing due today", color: staffData.closeSubmitted ? "green" : "orange" }
      ]
    }),
    [staffData, staffTotals]
  );
  const selectedContent = useMemo(
    () => (selectedScreen === "staff" ? dynamicStaffContent : dashboardContent[selectedScreen]),
    [dynamicStaffContent, selectedScreen]
  );
  const selectedStaffForm = useMemo(() => staffFormScreens[selectedScreen], [selectedScreen]);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function openStaffSheet(type) {
    setStaffForm({
      amount: "0",
      payment: "Cash",
      category: "Food",
      note: "",
      date: todayText
    });
    setActiveSheet(type);
  }

  function handleAction(action) {
    const screen = action.screen;

    if (selectedScreen === "salary") {
      if (screen) setActiveSheet(screen);
      else showToast(`${action.label} opened.`);
      return;
    }

    if (screen === "owner-review-close") {
      setActiveSheet("owner-close");
      return;
    }
    if (screen === "owner-proofs" || action.label === "Proof Review") {
      setActiveSheet("owner-proofs");
      return;
    }
    if (screen === "owner-staff") {
      setActiveSheet("owner-staff");
      return;
    }
    if (screen === "owner-summary") {
      setActiveSheet("owner-summary");
      return;
    }
    if (action.label === "Cash Health" || action.label === "Upgrade Active") {
      setActiveSheet("owner-summary");
      return;
    }
    if (screen === "staff-add-sale") {
      openStaffSheet("staff-sale");
      return;
    }
    if (screen === "staff-add-expense") {
      openStaffSheet("staff-expense");
      return;
    }
    if (screen === "staff-upload-receipt") {
      openStaffSheet("staff-receipt");
      return;
    }
    if (screen === "staff-close-day") {
      setActiveSheet("staff-close");
      return;
    }

    showToast(`${action.label} ready.`);
  }

  function handleMetric(metric) {
    if (selectedScreen === "owner") {
      if (metric.label.includes("Daily Close")) setActiveSheet("owner-close");
      else if (metric.label.includes("Proof")) setActiveSheet("owner-proofs");
      else if (metric.label === "Staff Active") setActiveSheet("owner-staff");
      else setActiveSheet("owner-summary");
    }

    if (selectedScreen === "staff") {
      if (metric.label === "Receipts") openStaffSheet("staff-receipt");
      else if (metric.label === "Gastos Added") openStaffSheet("staff-expense");
      else openStaffSheet("staff-sale");
    }
  }

  function handleNav(item) {
    if (selectedScreen === "owner") {
      if (item.label === "Home") showToast("Owner dashboard active.");
      if (item.label === "Approvals") setActiveSheet("owner-proofs");
      if (item.label === "Staff") setActiveSheet("owner-staff");
      if (item.label === "More" || item.label === "Summary") setActiveSheet("owner-summary");
    } else if (selectedScreen === "staff") {
      if (item.label === "Home") showToast("Katiwala dashboard active.");
      if (item.label === "Tasks") setActiveSheet("staff-close");
      if (item.label === "Proof") openStaffSheet("staff-receipt");
      if (item.label === "More") showToast("More options ready.");
    } else if (selectedScreen === "salary") {
      if (item.label === "Dashboard") showToast("Salary dashboard active.");
      if (item.label === "Transactions") setActiveSheet("salary-transactions");
      if (item.label === "Ipon") setActiveSheet("salary-ipon");
      if (item.label === "More") setActiveSheet("notifications");
    } else {
      showToast(`${item.label} selected.`);
    }
  }

  function saveStaffAction(type) {
    const amount = parseMoney(staffForm.amount);

    if (type === "staff-sale") {
      setStaffData((current) => ({
        ...current,
        sales: [...current.sales, { amount, note: staffForm.note, payment: staffForm.payment, date: staffForm.date }]
      }));
      showToast("Sale added.");
    }
    if (type === "staff-expense") {
      setStaffData((current) => ({
        ...current,
        expenses: [...current.expenses, { amount, note: staffForm.note, category: staffForm.category, date: staffForm.date }]
      }));
      showToast("Expense added.");
    }
    if (type === "staff-receipt") {
      setStaffData((current) => ({
        ...current,
        receipts: [...current.receipts, { amount, note: staffForm.note, date: staffForm.date }]
      }));
      showToast("Receipt uploaded for owner review.");
    }

    setActiveSheet(null);
  }

  return (
    <main className="app-shell">
      <section className="app-container" aria-label="BantayBiz mobile app">
        {selectedScreen === "salary" ? (
          <SalaryDashboard
            onBack={() => setSelectedScreen("mode-selection")}
            onAction={handleAction}
            onBell={() => setActiveSheet("notifications")}
            onNav={handleNav}
          />
        ) : selectedScreen === "owner" ? (
          <OwnerDashboard
            onBack={() => setSelectedScreen("mode-selection")}
            onAction={handleAction}
            onBell={() => setActiveSheet("notifications")}
            onNav={handleNav}
          />
        ) : selectedScreen === "staff" ? (
          <StaffDashboard
            totals={staffTotals}
            onBack={() => setSelectedScreen("mode-selection")}
            onAction={handleAction}
            onBell={() => setActiveSheet("notifications")}
          />
        ) : selectedContent ? (
          <Dashboard
            content={selectedContent}
            modeId={selectedScreen}
            onBack={() => setSelectedScreen("mode-selection")}
            onAction={handleAction}
            onBell={() => setActiveSheet("notifications")}
            onMetric={handleMetric}
            onNav={handleNav}
          />
        ) : selectedStaffForm ? (
          <Dashboard
            content={dashboardContent.staff}
            modeId="staff"
            onBack={() => setSelectedScreen("staff")}
            onAction={handleAction}
            onBell={() => setActiveSheet("notifications")}
            onMetric={handleMetric}
            onNav={handleNav}
          />
        ) : selectedScreen === "owner-review-close" ? (
          <Dashboard
            content={dashboardContent.owner}
            modeId="owner"
            onBack={() => setSelectedScreen("owner")}
            onAction={handleAction}
            onBell={() => setActiveSheet("notifications")}
            onMetric={handleMetric}
            onNav={handleNav}
          />
        ) : (
          <ModeSelection
            onSelectMode={setSelectedScreen}
            onInviteStaff={() => setActiveSheet("invite-staff")}
            onBell={() => setActiveSheet("notifications")}
          />
        )}

        {activeSheet === "invite-staff" && (
          <InviteCodeSheet
            onClose={() => setActiveSheet(null)}
            onEnter={() => {
              setActiveSheet(null);
              setSelectedScreen("staff");
              showToast("Pumasok bilang Katiwala.");
            }}
          />
        )}
        {activeSheet === "notifications" && (
          <NotificationSheet mode={selectedScreen} onClose={() => setActiveSheet(null)} />
        )}
        {activeSheet?.startsWith("salary-") && (
          <SalarySheet
            sheet={activeSheet}
            onClose={() => setActiveSheet(null)}
            onSave={() => {
              setActiveSheet(null);
              showToast("Saved sa Salary Mode.");
            }}
          />
        )}
        {activeSheet === "owner-close" && (
          <OwnerDailyCloseSheet
            reviewState={reviewState}
            onApprove={() => {
              setReviewState("approved");
              showToast("Daily Close approved.");
            }}
            onRequest={() => {
              setReviewState("correction");
              showToast("Correction request sent to staff.");
            }}
            onClose={() => setActiveSheet(null)}
          />
        )}
        {activeSheet === "owner-proofs" && (
          <OwnerProofSheet
            proofState={proofState}
            onApprove={(label) => {
              setProofState(`${label} approved.`);
              showToast("Proof approved.");
            }}
            onReject={(label) => {
              setProofState(`${label} rejected.`);
              showToast("Proof rejected.");
            }}
            onClose={() => setActiveSheet(null)}
          />
        )}
        {activeSheet === "owner-staff" && <OwnerStaffSheet onClose={() => setActiveSheet(null)} />}
        {activeSheet === "owner-summary" && <OwnerSummarySheet onClose={() => setActiveSheet(null)} />}
        {["staff-sale", "staff-expense", "staff-receipt"].includes(activeSheet) && (
          <StaffActionSheet
            type={activeSheet.replace("staff-", "")}
            values={staffForm}
            onChange={(field, value) => setStaffForm((current) => ({ ...current, [field]: value }))}
            onSave={() => saveStaffAction(activeSheet)}
            onClose={() => setActiveSheet(null)}
          />
        )}
        {activeSheet === "staff-close" && (
          <StaffCloseDaySheet
            totals={staffTotals}
            note={staffNote}
            closeSubmitted={staffData.closeSubmitted}
            onNote={setStaffNote}
            onSubmit={() => {
              setStaffData((current) => ({ ...current, closeSubmitted: true }));
              showToast("Close Day submitted to owner for review.");
            }}
            onClose={() => setActiveSheet(null)}
          />
        )}
        <Toast message={toast} />
      </section>
    </main>
  );
}

export default App;
