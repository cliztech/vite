import { getEnv, assertLiveCreds } from "./env.server";

type Product = {
  id: string;
  handle: string;
  title: string;
  image?: string;
  price: string;
};

export type Storefront = {
  listProducts(): Promise<Product[]>;
  productByHandle(handle: string): Promise<Product | null>;
};

const MOCK_PRODUCTS: Product[] = [
  { id: "1", handle: "poody-plush", title: "Poody Plush", price: "$19.99", image: "https://placehold.co/600x400?text=Poody+Plush" },
  { id: "2", handle: "poodyette-cap", title: "Poodyette Cap", price: "$12.99", image: "https://placehold.co/600x400?text=Poodyette+Cap" },
];

export function createStorefront(): Storefront {
  const { useMocks } = getEnv();
  if (useMocks) return mockedStorefront();
  return liveStorefront();
}

function mockedStorefront(): Storefront {
  return {
    async listProducts() {
      return MOCK_PRODUCTS;
    },
    async productByHandle(handle: string) {
      return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
    },
  };
}

function liveStorefront(): Storefront {
  assertLiveCreds();
  const { domain, token } = getEnv();
  const endpoint = `https://${domain}/api/2024-07/graphql.json`;
  async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": String(token),
      },
      body: JSON.stringify({ query, variables }),
    });
    if (!res.ok) throw new Error(`Storefront API error: ${res.status}`);
    const json = await res.json();
    return json.data as T;
  }
  return {
    async listProducts() {
      type Q = { products: { nodes: { id: string; handle: string; title: string; images: { nodes: { url: string }[] }; priceRange: { minVariantPrice: { amount: string; currencyCode: string } } }[] } };
      const data = await gql<Q>(/* GraphQL */ `
        query Products {
          products(first: 12) {
            nodes {
              id
              handle
              title
              images(first: 1) { nodes { url } }
              priceRange { minVariantPrice { amount currencyCode } }
            }
          }
        }
      `);
      return data.products.nodes.map((n) => ({
        id: n.id,
        handle: n.handle,
        title: n.title,
        image: n.images.nodes[0]?.url,
        price: `$${Number(n.priceRange.minVariantPrice.amount).toFixed(2)}`,
      }));
    },
    async productByHandle(handle: string) {
      type Q = { productByHandle: { id: string; handle: string; title: string; description: string; images: { nodes: { url: string }[] }; priceRange: { minVariantPrice: { amount: string; currencyCode: string } } } | null };
      const data = await gql<Q>(/* GraphQL */ `
        query Product($handle: String!) {
          productByHandle(handle: $handle) {
            id
            handle
            title
            description
            images(first: 1) { nodes { url } }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      `, { handle });
      const p = data.productByHandle;
      if (!p) return null;
      return {
        id: p.id,
        handle: p.handle,
        title: p.title,
        image: p.images.nodes[0]?.url,
        price: `$${Number(p.priceRange.minVariantPrice.amount).toFixed(2)}`,
      } as Product;
    },
  };
}

