import { useId, useState } from "react";

type Tab = { id: string; label: string; content: React.ReactNode };

export function Tabs({ tabs, defaultTabId }: { tabs: Tab[]; defaultTabId?: string }) {
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id);
  const id = useId();
  return (
    <div>
      <div role="tablist" aria-label="Tabs" className="flex gap-2 mb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`${id}-${t.id}`}
            id={`${id}-tab-${t.id}`}
            className={`rounded-full px-4 py-2 font-semibold ${
              active === t.id ? "bg-pink-600 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
            }`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${id}-${t.id}`}
          aria-labelledby={`${id}-tab-${t.id}`}
          hidden={active !== t.id}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

