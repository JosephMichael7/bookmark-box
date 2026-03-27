"use client";

import { createContext, useContext, useMemo, useState } from "react";

type ToastContextValue = {
  pushToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");

  const value = useMemo(
    () => ({
      pushToast(next: string) {
        setMessage(next);
        window.clearTimeout((window as Window & { __toastTimer?: number }).__toastTimer);
        (window as Window & { __toastTimer?: number }).__toastTimer = window.setTimeout(() => {
          setMessage("");
        }, 2200);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <div className="toast-wrap">
          <div className="toast">{message}</div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

