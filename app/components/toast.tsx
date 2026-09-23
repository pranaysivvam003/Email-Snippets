"use client";

type ToastProps = { message: string; onClose: () => void };

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;
  return <div className="toast" role="status" aria-live="polite"><span>✓</span>{message}<button aria-label="Dismiss notification" onClick={onClose}>×</button></div>;
}
