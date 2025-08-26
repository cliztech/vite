import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import tailwindHref from "./styles/tailwind.css?url";
import { Header } from "./shared/Header";
import { Footer } from "./shared/Footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindHref },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    brand: "Poody Toons",
  });
}

export default function App() {
  return (
    <html lang="en" className="bg-pink-50 text-slate-900">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="container mx-auto max-w-6xl px-4 py-6 flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const err = useRouteError();
  const message = isRouteErrorResponse(err) ? `${err.status} ${err.statusText}` : (err as Error)?.message;
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-dvh grid place-items-center p-8">
        <div className="poody-card p-6 text-center">
          <h1 className="text-3xl font-extrabold mb-2">Oops! Something went wrong</h1>
          <p className="text-lg">{message}</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

