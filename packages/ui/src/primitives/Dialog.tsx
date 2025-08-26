import { PropsWithChildren, useEffect } from "react";

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
}>;

export function Dialog({ open, onClose, title, children }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div className="poody-card max-w-lg w-full p-4" onClick={(e) => e.stopPropagation()}>
        {title ? (
          <h2 id="dialog-title" className="text-xl font-extrabold mb-2">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </div>
  );
}

