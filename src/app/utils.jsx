import React from "react";
import { CheckCircle2, X } from "lucide-react";

export const todayText = "27/06/2026";

export function money(value) {
  return `PHP ${value.toLocaleString("en-US")}`;
}

export function peso(value) {
  return `₱${value.toLocaleString("en-US")}`;
}

export function parseMoney(value) {
  const parsed = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast" role="status">
      <CheckCircle2 size={18} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export function BottomSheet({ title, subtitle, children, onClose }) {
  return (
    <div className="sheet-backdrop" role="presentation">
      <section className="bottom-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-handle" />
        <div className="sheet-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="sheet-close" type="button" aria-label="Close" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function InfoRows({ rows }) {
  return (
    <div className="info-list">
      {rows.map((row) => (
        <div className="info-row" key={row.label}>
          <span>{row.label}</span>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  );
}
