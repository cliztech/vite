import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button, Card } from "@poody/ui";
import { createStorefront } from "../lib/storefront.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const handle = params.handle ?? "unknown";
  const sf = createStorefront();
  const p = await sf.productByHandle(handle);
  const fallback = {
    handle,
    title: handle.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
    price: "$19.99",
    image: "https://placehold.co/600x400?text=" + encodeURIComponent(handle),
    description: "Soft, cuddly, and full of smiles!",
  };
  const product = p ?? fallback;
  return json({ product });
}

export default function ProductHandle() {
  const { product } = useLoaderData<typeof loader>();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="overflow-hidden">
        <img className="w-full h-64 object-cover" src={product.image} alt={product.title} />
      </Card>
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-pink-700">{product.title}</h1>
        <p className="text-lg">{product.description}</p>
        <p className="text-2xl text-pink-700 font-extrabold">{product.price}</p>
        <form method="post" action="/cart">
          <Button type="submit" variant="primary" size="lg" aria-label="Add to cart">
            Add to Cart
          </Button>
        </form>
      </div>
    </div>
  );
}
