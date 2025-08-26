import { Card } from "@poody/ui";

export default function Privacy() {
  return (
    <Card className="p-6 space-y-3">
      <h1 className="text-3xl font-extrabold text-pink-700">Privacy</h1>
      <p>
        We are COPPA-friendly. We do not collect personal information from children. No
        third-party trackers are loaded without explicit adult consent.
      </p>
    </Card>
  );
}

