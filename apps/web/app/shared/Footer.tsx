export function Footer() {
  return (
    <footer className="mt-8 border-t border-pink-100 bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} Poody Toons. Be kind, be curious!
          </p>
          <nav className="flex gap-4">
            <a className="hover:underline" href="/privacy">Privacy</a>
            <a className="hover:underline" href="/terms">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

