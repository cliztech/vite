import { Suspense, lazy } from "react";
import { Card, Tabs } from "@poody/ui";

const ColorNSave = lazy(() => import("@poody/games").then(m => ({ default: m.ColorNSave })));

export default function Games() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-pink-700 mb-4">Games</h1>
      <Tabs
        tabs={[
          {
            id: "color",
            label: "Color‑n‑Save",
            content: (
              <Card className="p-4">
                <Suspense fallback={<p>Loading painter…</p>}>
                  <ColorNSave width={640} height={400} />
                </Suspense>
              </Card>
            ),
          },
          {
            id: "runner",
            label: "Runner (Soon)",
            content: <Card className="p-4">Runner game coming next sprint.</Card>,
          },
        ]}
      />
    </div>
  );
}

