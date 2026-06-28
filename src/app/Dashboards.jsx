import React from "react";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  LockKeyhole,
  Target
} from "lucide-react";
import {
  ActionCard,
  AppHeader,
  BottomNav,
  IconBadge,
  MetricCard,
  PrimaryButton,
  ScreenContainer,
  StatusBadge
} from "../components/ui";
import { dashboardContent } from "../data";
import { ownerStatusCards, salaryActions, staffActions } from "./actions";
import { peso } from "./utils";

export function SalaryDashboard({ onBack, onAction, onBell, onNav }) {
  return (
    <>
      <header className="salary-topbar">
        <button className="salary-back" type="button" aria-label="Back to mode selection" onClick={onBack}>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="salary-title-wrap">
          <span>Magandang umaga,</span>
          <div className="salary-name-row">
            <strong>Mara D.</strong>
            <StatusBadge color="purple">Salary Mode</StatusBadge>
          </div>
        </div>
        <button className="header-icon notification-button" type="button" aria-label="Notifications" onClick={onBell}>
          <Bell className="bell-icon" size={19} aria-hidden="true" />
          <span className="alert-dot" aria-hidden="true" />
        </button>
      </header>

      <ScreenContainer className="salary-screen">
        <section className="salary-summary-card" aria-label="Salary summary">
          <p>
            <LockKeyhole size={14} aria-hidden="true" />
            Net Cash ngayon · Pribado
          </p>
          <strong className="salary-summary-amount">₱18,650</strong>
          <div className="salary-inner-stats">
            <div className="salary-inner-stat">
              <span>Sweldo this month</span>
              <strong>₱28,500</strong>
            </div>
            <div className="salary-inner-stat">
              <span>Gastos this month</span>
              <strong>₱9,850</strong>
            </div>
          </div>
        </section>

        <section className="salary-actions-grid" aria-label="Salary actions">
          {salaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                className="salary-action-card"
                type="button"
                key={action.label}
                onClick={() => onAction(action)}
              >
                <IconBadge icon={Icon} color={action.color} size={20} />
                <strong>{action.label}</strong>
                <span>{action.detail}</span>
              </button>
            );
          })}
        </section>

        <button className="ipon-card" type="button" onClick={() => onAction({ label: "Ipon Goal", screen: "salary-ipon" })}>
          <IconBadge icon={Target} color="purple" size={20} />
          <div className="ipon-card-main">
            <div className="ipon-card-title">
              <strong>Ipon: Pang-emergency</strong>
              <span>₱38,000 sa ₱50,000</span>
            </div>
            <div className="ipon-progress" aria-hidden="true">
              <span className="ipon-progress-fill" />
            </div>
            <div className="ipon-progress-meta">
              <span>76% na</span>
              <span>₱12,000 na lang</span>
            </div>
          </div>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </ScreenContainer>

      <BottomNav items={dashboardContent.salary.nav} mode="purple" onSelect={onNav} />
    </>
  );
}

export function OwnerDashboard({ onBack, onAction, onBell, onNav }) {
  return (
    <>
      <header className="owner-topbar">
        <button className="salary-back" type="button" aria-label="Back to mode selection" onClick={onBack}>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="owner-title-wrap">
          <span>Kumusta,</span>
          <div className="owner-name-row">
            <strong>Aling Rosa!</strong>
            <StatusBadge color="green">Owner Mode</StatusBadge>
          </div>
        </div>
        <button className="header-icon notification-button" type="button" aria-label="Notifications" onClick={onBell}>
          <Bell className="bell-icon" size={19} aria-hidden="true" />
          <span className="alert-dot" aria-hidden="true" />
        </button>
      </header>

      <ScreenContainer className="owner-screen">
        <section className="owner-summary-card" aria-label="Owner cash summary">
          <p>Net Cash ngayon</p>
          <strong className="owner-summary-amount">₱8,560</strong>
          <div className="owner-inner-stats">
            <div className="owner-inner-stat">
              <span>Today's Sales</span>
              <strong>₱12,450</strong>
            </div>
            <div className="owner-inner-stat">
              <span>Today's Expenses</span>
              <strong>₱3,890</strong>
            </div>
          </div>
        </section>

        <section className="owner-status-grid" aria-label="Owner status cards">
          {ownerStatusCards.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className="owner-status-card"
                type="button"
                key={item.label}
                onClick={() => onAction(item)}
              >
                <IconBadge icon={Icon} color={item.color} size={17} />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </button>
            );
          })}
        </section>

        <button className="owner-alert-card" type="button" onClick={() => onAction({ screen: "owner-review-close" })}>
          <IconBadge icon={AlertCircle} color="orange" size={18} />
          <div>
            <strong>May naghihintay na daily close</strong>
            <span>Isinumite ni Jun · 8:42 PM</span>
          </div>
          <ChevronRight size={20} aria-hidden="true" />
        </button>

        <div className="owner-action-row">
          <PrimaryButton color="green" onClick={() => onAction({ screen: "owner-review-close" })}>
            Review Daily Close
          </PrimaryButton>
          <button className="secondary-button green" type="button" onClick={() => onAction({ screen: "owner-proofs" })}>
            View Proofs
          </button>
        </div>
      </ScreenContainer>

      <BottomNav items={dashboardContent.owner.nav} mode="green" onSelect={onNav} />
    </>
  );
}

export function StaffDashboard({ totals, onBack, onAction, onBell }) {
  const netCash = totals.sales - totals.expenses;

  return (
    <>
      <header className="staff-topbar">
        <button className="salary-back" type="button" aria-label="Back to mode selection" onClick={onBack}>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="staff-title-wrap">
          <div className="staff-name-row">
            <strong>Kumusta, Jun!</strong>
            <StatusBadge color="pink">Katiwala</StatusBadge>
          </div>
          <span>Rosa Sari-Sari</span>
        </div>
        <button className="header-icon notification-button" type="button" aria-label="Notifications" onClick={onBell}>
          <Bell className="bell-icon" size={19} aria-hidden="true" />
          <span className="alert-dot" aria-hidden="true" />
        </button>
      </header>

      <ScreenContainer className="staff-screen">
        <section className="staff-summary-card" aria-label="Staff sales summary">
          <p>Benta ngayon araw</p>
          <strong className="staff-summary-amount">{peso(totals.sales)}</strong>
          <div className="staff-inner-stats">
            <div className="staff-inner-stat">
              <span>Gastos</span>
              <strong>{peso(totals.expenses)}</strong>
            </div>
            <div className="staff-inner-stat">
              <span>Net Cash</span>
              <strong>{peso(netCash)}</strong>
            </div>
          </div>
        </section>

        <button className="staff-reminder-card" type="button" onClick={() => onAction({ screen: "staff-close-day" })}>
          <AlertCircle size={18} aria-hidden="true" />
          <span>Tandaan: i-Close Day bago umuwi para ma-review ng owner.</span>
        </button>

        <section className="staff-task-section" aria-label="Staff actions">
          <h2>Anong gagawin natin?</h2>
          <div className="staff-actions-grid">
            {staffActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  className="staff-action-card"
                  type="button"
                  key={action.label}
                  onClick={() => onAction(action)}
                >
                  <IconBadge icon={Icon} color={action.color} size={20} />
                  <strong>{action.label}</strong>
                  <span>{action.detail}</span>
                </button>
              );
            })}
          </div>
        </section>
      </ScreenContainer>

      <div className="staff-bottom-cta">
        <PrimaryButton color="pink" icon={Check} onClick={() => onAction({ screen: "staff-close-day" })}>
          Close Day ngayon
        </PrimaryButton>
      </div>
    </>
  );
}

export function Dashboard({ content, modeId, onBack, onAction, onBell, onMetric, onNav }) {
  const isOwner = modeId === "owner";
  const isStaff = modeId === "staff";

  return (
    <>
      <AppHeader
        title={content.title}
        subtitle={content.subtitle}
        mode={isOwner ? "green" : content.hero.color}
        initial={content.initial}
        showBack
        onBack={onBack}
        onBell={onBell}
      />

      <ScreenContainer className="dashboard-screen">
        <section className={`dashboard-hero ${content.hero.color}`}>
          <div>
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1>{content.hero.title}</h1>
            <span>{content.hero.detail}</span>
          </div>
          <IconBadge icon={content.hero.icon} color={content.hero.color} size={26} />
        </section>

        <div className="status-row">
          {content.statuses.map((status) => (
            <StatusBadge color={status.color} key={status.label}>
              {status.label}
            </StatusBadge>
          ))}
        </div>

        {isStaff && (
          <button className="notice-card pink" type="button" onClick={() => onAction({ screen: "staff-close-day" })}>
            <AlertCircle size={18} aria-hidden="true" />
            <span>Tandaan: i-Close Day bago umuwi para ma-review ng owner.</span>
          </button>
        )}

        <section className="dashboard-section">
          <div className="section-heading">
            <h2>Quick view</h2>
            <span>Today</span>
          </div>
          <div className="metric-preview-grid">
            {content.metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                {...metric}
                onClick={isOwner || isStaff ? () => onMetric?.(metric) : undefined}
              />
            ))}
          </div>
        </section>

        {isOwner && (
          <button className="notice-card orange" type="button" onClick={() => onAction({ screen: "owner-review-close" })}>
            <AlertCircle size={18} aria-hidden="true" />
            <span>May naghihintay na daily close. Isinumite ni Jun - 8:42 PM</span>
          </button>
        )}

        <section className="dashboard-section">
          <div className="section-heading">
            <h2>Actions</h2>
            <span>Ready</span>
          </div>
          <div className="action-grid">
            {content.actions.map((action) => (
              <ActionCard key={action.label} {...action} onClick={() => onAction?.(action)} />
            ))}
          </div>
        </section>

        {isOwner && (
          <div className="review-actions two-up">
            <PrimaryButton color="green" onClick={() => onAction({ screen: "owner-review-close" })}>
              Review Daily Close
            </PrimaryButton>
            <button className="secondary-button green" type="button" onClick={() => onAction({ screen: "owner-proofs" })}>
              View Proofs
            </button>
          </div>
        )}

        {isStaff ? (
          <PrimaryButton color="pink" onClick={() => onAction({ screen: "staff-close-day" })}>
            Close Day ngayon
          </PrimaryButton>
        ) : (
          <PrimaryButton color={content.hero.color} onClick={onBack}>
            Back to mode selection
          </PrimaryButton>
        )}
      </ScreenContainer>

      <BottomNav items={content.nav} mode={content.hero.color} onSelect={onNav} />
    </>
  );
}
