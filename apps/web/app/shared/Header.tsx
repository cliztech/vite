import { Link, NavLink } from "@remix-run/react";
import { Button } from "@poody/ui";

export function Header() {
  const nav = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/games", label: "Games" },
    { to: "/toons", label: "Toons" },
    { to: "/about", label: "About" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100">
      <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-extrabold text-pink-600">
          Poody Toons
        </Link>
        <nav className="hidden md:flex gap-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? "bg-pink-600 text-white" : "text-pink-700 hover:bg-pink-100"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Button asChild size="lg" variant="primary">
          <Link to="/cart" aria-label="View cart">
            Cart
          </Link>
        </Button>
      </div>
    </header>
  );
}

