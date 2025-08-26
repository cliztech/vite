import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";

async function start() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import("./mocks/browser");
      await worker.start({ serviceWorker: { url: "/mockServiceWorker.js" } });
    } catch (e) {
      console.warn("MSW not started", e);
    }
  }
  hydrateRoot(document, <RemixBrowser />);
}

start();
