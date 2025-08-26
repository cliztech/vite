import type { ServerBuild, RemixConfig } from "@remix-run/dev";

export default {
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true
  },
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  serverPlatform: "node",
  serverBuildTarget: "node-cjs",
  tailwind: true
} satisfies RemixConfig;

