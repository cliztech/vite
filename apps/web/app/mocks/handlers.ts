import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/storefront", async ({ request }) => {
    const { query, variables } = await request.json();
    // Minimal mock GraphQL router (extend as needed)
    if (String(query).includes("products(first")) {
      return HttpResponse.json({
        data: {
          products: {
            nodes: [
              { id: "gid://shopify/Product/1", handle: "poody-plush", title: "Poody Plush", images: { nodes: [{ url: "https://placehold.co/600x400?text=Poody+Plush" }] }, priceRange: { minVariantPrice: { amount: "19.99", currencyCode: "USD" } } },
              { id: "gid://shopify/Product/2", handle: "poodyette-cap", title: "Poodyette Cap", images: { nodes: [{ url: "https://placehold.co/600x400?text=Poodyette+Cap" }] }, priceRange: { minVariantPrice: { amount: "12.99", currencyCode: "USD" } } },
            ],
          },
        },
      });
    }
    if (String(query).includes("productByHandle")) {
      const handle = variables?.handle ?? "poody-plush";
      return HttpResponse.json({
        data: {
          productByHandle: {
            id: "gid://shopify/Product/mock",
            handle,
            title: String(handle).replace(/-/g, " ").replace(/\b\w/g, (m: string) => m.toUpperCase()),
            description: "Soft, cuddly, and full of smiles!",
            images: { nodes: [{ url: `https://placehold.co/600x400?text=${encodeURIComponent(handle)}` }] },
            priceRange: { minVariantPrice: { amount: "19.99", currencyCode: "USD" } },
          },
        },
      });
    }
    return HttpResponse.json({ data: {} });
  }),
];

