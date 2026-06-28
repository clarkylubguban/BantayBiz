import React from "react";
import { Bell, ShieldCheck } from "lucide-react";
import { IconBadge, ScreenContainer, StatusBadge } from "../components/ui";
import { modes } from "../data";

export function ModeSelection({ onSelectMode, onInviteStaff, onBell }) {
  const salaryMode = modes.find((mode) => mode.id === "salary");
  const ownerMode = modes.find((mode) => mode.id === "owner");

  return (
    <ScreenContainer className="mode-selection-screen">
      <div className="mode-topbar" aria-label="BantayBiz welcome header">
          <div className="mode-brand">
            <div className="mode-logo">
              <ShieldCheck size={20} aria-hidden="true" />
            </div>
            <strong>Bantay<span>Biz</span></strong>
          </div>
        <button className="header-icon notification-button" type="button" aria-label="Notifications" onClick={onBell}>
          <Bell className="bell-icon" size={19} aria-hidden="true" />
          <span className="alert-dot" aria-hidden="true" />
        </button>
      </div>

      <section className="mode-intro">
        <h1>
          <span>Pangarap mong negosyo,</span>
          <span>Simulan ngayon.</span>
        </h1>
        <p>Libre muna para sa&apos;yo. Bantayan ang sweldo, gastos, at ipon.</p>
      </section>

      <section className="onboarding-card-list" aria-label="Choose BantayBiz mode">
        {salaryMode && (
          <button
            className="onboarding-card salary"
            type="button"
            onClick={() => onSelectMode("salary")}
          >
            <div className="onboarding-card-head">
              <IconBadge icon={salaryMode.icon} color="purple" size={19} />
              <StatusBadge color="purple" pulse>
                FREE
              </StatusBadge>
            </div>
            <strong>{salaryMode.title}</strong>
            <p>{salaryMode.description}</p>
            <div className="onboarding-card-foot">
              <StatusBadge color="purple">Pribado</StatusBadge>
              <span>Simulan na →</span>
            </div>
          </button>
        )}

        {ownerMode && (
          <button
            className="onboarding-card owner"
            type="button"
            onClick={() => onSelectMode("owner")}
          >
            <IconBadge icon={ownerMode.icon} color="mint" size={19} />
            <strong>{ownerMode.title}</strong>
            <p>{ownerMode.description}</p>
            <span className="owner-link">Simulan na →</span>
          </button>
        )}
      </section>

      <button className="invite-pill" type="button" onClick={onInviteStaff}>
        May Invite Code Ako →
      </button>

      <p className="mode-trust-note">Ang Salary Mode ay pribado sa&apos;yo lang. Walang ibang makakakita.</p>
    </ScreenContainer>
  );
}
