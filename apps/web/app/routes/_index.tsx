import { Card } from "@poody/ui";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-2">Welcome to Poody Toons!</h1>
        <p className="text-lg">
          Safe, playful, and educational fun. Explore games, watch toons, and shop
          friendly gear — all crafted for kids.
        </p>
        <div className="mt-4 flex gap-3">
          <Link className="underline font-semibold" to="/games">Play Games</Link>
          <Link className="underline font-semibold" to="/toons">Watch Toons</Link>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-2">Grown-ups’ Corner</h2>
        <p>
          We follow COPPA-friendly patterns and accessibility guidelines (WCAG AA+). No
          dark patterns or sneaky ads.
        </p>
      </Card>
    </div>
  );
}

