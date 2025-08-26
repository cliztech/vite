export function getEnv() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  const useMocks = String(process.env.USE_MOCKS || "true").toLowerCase() === "true";
  return { domain, token, useMocks } as const;
}

export function assertLiveCreds() {
  const { domain, token } = getEnv();
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN. Add them to .env or set USE_MOCKS=true."
    );
  }
}

