import React from "react";
import { ArrowLeft, Bell, ShieldCheck } from "lucide-react";

export function PhoneFrame({ children }) {
  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="BantayBiz mobile prototype">
        <div className="status-bar">
          <span>9:41</span>
          <span>LTE 100</span>
        </div>
        {children}
      </section>
    </main>
  );
}

export function ScreenContainer({ children, className = "" }) {
  return <section className={`screen-container ${className}`}>{children}</section>;
}

export function AppHeader({
  title,
  subtitle,
  mode = "green",
  initial = "B",
  onBack,
  onBell,
  showBack = false
}) {
  return (
    <header className={`app-header ${mode}`}>
      {showBack ? (
        <button className="header-icon" type="button" aria-label="Go back" onClick={onBack}>
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
      ) : (
        <div className={`avatar ${mode}`}>{initial}</div>
      )}

      <div className="header-copy">
        <span>{subtitle}</span>
        <strong>{title}</strong>
      </div>

      <button className="header-icon" type="button" aria-label="Notifications" onClick={onBell}>
        <Bell size={19} aria-hidden="true" />
      </button>
    </header>
  );
}

export function BrandHeader() {
  return (
    <div className="brand-header">
      <div className="brand-badge">
        <ShieldCheck size={27} aria-hidden="true" />
      </div>
      <div>
        <strong>BantayBiz</strong>
        <span>Bantay sa pera, bantay sa negosyo</span>
      </div>
    </div>
  );
}

export function IconBadge({ icon: Icon, color = "green", size = 22 }) {
  return (
    <div className={`icon-badge ${color}`}>
      <Icon size={size} aria-hidden="true" />
    </div>
  );
}

export function MetricCard({ label, value, detail, color = "green", icon, onClick }) {
  const content = (
    <>
      {icon && <IconBadge icon={icon} color={color} size={20} />}
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <p>{detail}</p>}
    </>
  );

  if (onClick) {
    return (
      <button className={`metric-card clickable ${color}`} type="button" onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <article className={`metric-card ${color}`}>
      {content}
    </article>
  );
}

export function ActionCard({ icon, label, detail, color = "green", onClick }) {
  return (
    <button className="action-card" type="button" onClick={onClick}>
      <IconBadge icon={icon} color={color} />
      <span>{label}</span>
      <small>{detail}</small>
    </button>
  );
}

export function BottomNav({ items, active = 0, mode = "green", onSelect }) {
  return (
    <nav className="bottom-nav" aria-label="App navigation">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            className={index === active ? `active ${mode}` : ""}
            type="button"
            key={item.label}
            onClick={() => onSelect?.(item, index)}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function StatusBadge({ children, color = "green", pulse = false }) {
  return <span className={`status-badge ${color}${pulse ? " pulse" : ""}`}>{children}</span>;
}

export function FormInput({ label, value, placeholder = "", onChange, readOnly = true, type = "text" }) {
  return (
    <label className="form-input">
      <span>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}

export function PrimaryButton({ children, color = "green", onClick, icon: Icon }) {
  return (
    <button className={`primary-button ${color}`} type="button" onClick={onClick}>
      {Icon && <Icon size={20} aria-hidden="true" />}
      {children}
    </button>
  );
}
