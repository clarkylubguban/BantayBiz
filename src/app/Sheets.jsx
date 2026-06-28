import React from "react";
import { ArrowDown, ArrowUp, Camera, ReceiptText, Send, Target, UsersRound } from "lucide-react";
import { FormInput, IconBadge, PrimaryButton } from "../components/ui";
import { ownerDailyCloseReview } from "../data";
import { BottomSheet, InfoRows, peso, todayText } from "./utils";

export function InviteCodeSheet({ onClose, onEnter }) {
  return (
    <BottomSheet title="Para sa Staff / Katiwala" subtitle="Ilagay ang invite code mula sa may-ari." onClose={onClose}>
      <div className="form-stack">
        <FormInput label="Invite Code" value="HAL. ROSA-4827" />
        <PrimaryButton color="green" onClick={onEnter}>
          Pumasok bilang Katiwala
        </PrimaryButton>
        <p className="sheet-note">Ang access mo ay kontrolado ng owner.</p>
      </div>
    </BottomSheet>
  );
}

export function NotificationSheet({ mode, onClose }) {
  return (
    <BottomSheet title="Notifications" subtitle="Latest BantayBiz updates" onClose={onClose}>
      <div className="info-list">
        <div className="info-row">
          <span>Daily reminder</span>
          <strong>{mode === "staff" ? "Close Day before end of shift" : "1 item needs review"}</strong>
        </div>
        <div className="info-row">
          <span>Status</span>
          <strong>All systems ready</strong>
        </div>
      </div>
    </BottomSheet>
  );
}

export function OwnerDailyCloseSheet({ reviewState, onApprove, onRequest, onClose }) {
  return (
    <BottomSheet title="Review Daily Close" subtitle="Submitted by Jun - Rosa Sari-Sari" onClose={onClose}>
      <InfoRows
        rows={[
          { label: "Staff name", value: ownerDailyCloseReview.submittedBy },
          { label: "Business", value: "Rosa Sari-Sari" },
          { label: "Today's sales", value: "₱12,450" },
          { label: "Today's expenses", value: "₱3,890" },
          { label: "Net cash", value: "₱8,560" },
          { label: "Submitted time", value: ownerDailyCloseReview.submittedTime },
          { label: "Staff note", value: ownerDailyCloseReview.staffNote }
        ]}
      />
      {reviewState === "approved" && <p className="feedback-text green">Daily Close approved.</p>}
      {reviewState === "correction" && <p className="feedback-text orange">Correction request sent to staff.</p>}
      <div className="review-actions">
        <PrimaryButton color="green" onClick={onApprove}>
          Approve
        </PrimaryButton>
        <PrimaryButton color="orange" onClick={onRequest}>
          Request Correction
        </PrimaryButton>
      </div>
    </BottomSheet>
  );
}

export function OwnerProofSheet({ proofState, onApprove, onReject, onClose }) {
  return (
    <BottomSheet title="Proof Review" subtitle="Uploaded receipts for checking" onClose={onClose}>
      <div className="proof-list">
        {ownerDailyCloseReview.proofs.map((proof, index) => (
          <article className="proof-row owner-proof-row" key={proof.label}>
            <IconBadge icon={ReceiptText} color={proof.color} size={18} />
            <div>
              <strong>{proof.label}</strong>
              <span>Jun · {proof.detail} · {index + 1}:42 PM</span>
              <small>View proof placeholder</small>
            </div>
            <button type="button" onClick={() => onApprove(proof.label)}>Approve</button>
            <button type="button" onClick={() => onReject(proof.label)}>Reject</button>
          </article>
        ))}
      </div>
      {proofState && <p className="feedback-text blue">{proofState}</p>}
    </BottomSheet>
  );
}

export function OwnerStaffSheet({ onClose }) {
  return (
    <BottomSheet title="Staff" subtitle="Team activity today" onClose={onClose}>
      <div className="proof-list">
        {["Jun", "Liza", "Mark"].map((name, index) => (
          <article className="proof-row" key={name}>
            <IconBadge icon={UsersRound} color={index === 1 ? "pink" : "green"} size={18} />
            <div>
              <strong>{name}</strong>
              <span>{index === 2 ? "Inactive" : "Active"} - Sales submitted - Expenses submitted - Proof uploaded</span>
            </div>
          </article>
        ))}
      </div>
    </BottomSheet>
  );
}

export function OwnerSummarySheet({ onClose }) {
  return (
    <BottomSheet title="Summary" subtitle="Business snapshot today" onClose={onClose}>
      <InfoRows
        rows={[
          { label: "Today's total sales", value: "₱12,450" },
          { label: "Today's total expenses", value: "₱3,890" },
          { label: "Net cash", value: "₱8,560" },
          { label: "Pending daily close", value: "1" },
          { label: "Pending proof", value: "2" },
          { label: "Staff active", value: "2/3" }
        ]}
      />
    </BottomSheet>
  );
}

export function StaffActionSheet({ type, values, onChange, onSave, onClose }) {
  const config = {
    sale: {
      title: "Add Sale",
      subtitle: "Itala ang benta",
      amountLabel: "Amount",
      saveLabel: "Save Sale",
      color: "pink",
      extra: (
        <>
          <FormInput label="Payment method" value={values.payment} readOnly={false} onChange={(value) => onChange("payment", value)} />
          <FormInput label="Sale note / item sold" value={values.note} readOnly={false} onChange={(value) => onChange("note", value)} />
        </>
      )
    },
    expense: {
      title: "Add Expense",
      subtitle: "Itala ang gastos",
      amountLabel: "Amount",
      saveLabel: "Save Expense",
      color: "orange",
      extra: (
        <>
          <FormInput label="Category" value={values.category} readOnly={false} onChange={(value) => onChange("category", value)} />
          <FormInput label="Notes" value={values.note} readOnly={false} onChange={(value) => onChange("note", value)} />
        </>
      )
    },
    receipt: {
      title: "Upload Receipt",
      subtitle: "Proof for owner review",
      amountLabel: "Amount",
      saveLabel: "Submit Receipt",
      color: "blue",
      extraBefore: (
          <button className="upload-placeholder" type="button">
            <Camera size={20} aria-hidden="true" />
            Upload / take photo placeholder
          </button>
      ),
      extra: (
        <FormInput label="Receipt note" value={values.note} readOnly={false} onChange={(value) => onChange("note", value)} />
      )
    }
  }[type];

  return (
    <BottomSheet title={config.title} subtitle={config.subtitle} onClose={onClose}>
      <div className="form-stack">
        {config.extraBefore}
        <FormInput label={config.amountLabel} value={values.amount} readOnly={false} onChange={(value) => onChange("amount", value)} />
        {config.extra}
        {type !== "receipt" && (
          <FormInput label="Date/time" value={values.date} readOnly={false} onChange={(value) => onChange("date", value)} />
        )}
        <PrimaryButton color={config.color} onClick={onSave}>
          {config.saveLabel}
        </PrimaryButton>
      </div>
    </BottomSheet>
  );
}

export function StaffCloseDaySheet({ totals, note, closeSubmitted, onNote, onSubmit, onClose }) {
  return (
    <BottomSheet title="Close Day" subtitle="Submit daily close to owner" onClose={onClose}>
      <InfoRows
        rows={[
          { label: "Today's sales", value: peso(totals.sales) },
          { label: "Today's expenses", value: peso(totals.expenses) },
          { label: "Net cash", value: peso(totals.sales - totals.expenses) },
          { label: "Uploaded receipts/proofs", value: String(totals.receipts) }
        ]}
      />
      <FormInput label="Staff note" value={note} readOnly={false} onChange={onNote} />
      {closeSubmitted ? (
        <p className="feedback-text pink">Close Day submitted to owner for review.</p>
      ) : (
        <PrimaryButton color="pink" onClick={onSubmit}>
          Submit to owner
        </PrimaryButton>
      )}
    </BottomSheet>
  );
}

export function SalarySheet({ sheet, onClose, onSave }) {
  const formConfig = {
    "salary-add-sweldo": {
      title: "Add Sweldo",
      subtitle: "Itala ang iyong kita",
      amountColor: "green",
      label: "Pinagmulan",
      value: "Buwanang Sweldo",
      saveLabel: "I-save ang Sweldo"
    },
    "salary-add-gastos": {
      title: "Add Gastos",
      subtitle: "Itala ang iyong gastos",
      amountColor: "orange",
      label: "Kategorya",
      value: "Pagkain",
      saveLabel: "I-save ang Gastos"
    },
    "salary-add-padala": {
      title: "Add Padala",
      subtitle: "Padala para sa pamilya",
      amountColor: "blue",
      label: "Padalhan",
      value: "Nanay · Pamilya",
      saveLabel: "I-save ang Padala"
    }
  }[sheet];

  if (sheet === "salary-transactions") {
    return (
      <BottomSheet title="Mga Transaksyon" subtitle="Mga huling galaw sa pera mo" onClose={onClose}>
        <div className="salary-transaction-list">
          {[
            ["Sweldo", "Jun 25 · Buwanang sweldo", "+₱28,500", "green", ArrowUp],
            ["Padala kay Nanay", "Jun 24 · Pamilya", "-₱5,000", "blue", Send],
            ["Grocery", "Jun 23 · Pagkain", "-₱2,150", "orange", ArrowDown],
            ["Kuryente", "Jun 22 · Bills", "-₱1,800", "orange", ArrowDown],
            ["Ipon transfer", "Jun 20 · Pang-emergency", "-₱3,000", "purple", Target]
          ].map(([title, detail, amount, color, Icon]) => (
            <article className="salary-transaction-row" key={title}>
              <IconBadge icon={Icon} color={color} size={18} />
              <div>
                <strong>{title}</strong>
                <span>{detail}</span>
              </div>
              <b className={color}>{amount}</b>
            </article>
          ))}
        </div>
        <PrimaryButton color="purple" onClick={onClose}>
          Isara
        </PrimaryButton>
      </BottomSheet>
    );
  }

  if (sheet === "salary-ipon") {
    return (
      <BottomSheet title="Ipon Goal" subtitle="Para sa pangarap mo" onClose={onClose}>
        <article className="salary-goal-sheet-card">
          <div>
            <strong>Pang-emergency</strong>
            <span>76% na</span>
          </div>
          <div className="ipon-progress" aria-hidden="true">
            <span className="ipon-progress-fill" />
          </div>
          <div className="ipon-progress-meta">
            <span>₱38,000</span>
            <span>₱12,000 na lang</span>
          </div>
        </article>
        <div className="form-stack">
          <FormInput label="Pangalan ng goal" value="Pang-emergency" readOnly={false} />
          <FormInput label="Target na halaga" value="₱ 50000" readOnly={false} />
          <PrimaryButton color="purple" onClick={onSave}>
            I-update ang Goal
          </PrimaryButton>
        </div>
      </BottomSheet>
    );
  }

  if (!formConfig) return null;

  return (
    <BottomSheet title={formConfig.title} subtitle={formConfig.subtitle} onClose={onClose}>
      <div className="form-stack">
        <FormInput label="Magkano?" value="₱ 0" readOnly={false} />
        <FormInput label={formConfig.label} value={formConfig.value} readOnly={false} />
        <FormInput label="Petsa" value={todayText} readOnly={false} />
        <PrimaryButton color={formConfig.amountColor} onClick={onSave}>
          {formConfig.saveLabel}
        </PrimaryButton>
      </div>
    </BottomSheet>
  );
}
