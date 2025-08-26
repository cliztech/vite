import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Card } from "@poody/ui";
import { createStorefront } from "../lib/storefront.server";

type Product = {
  id: string;
  handle: string;
  title: string;
  image?: string;
  price: string;
};

export async function loader(_args: LoaderFunctionArgs) {
  const sf = createStorefront();
  const products = await sf.listProducts();
  return json({ products });
}

export default function Shop() {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-pink-700 mb-4">Shop</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-lg">{p.title}</h2>
              <p className="text-pink-700 font-extrabold">{p.price}</p>
              <Link className="underline mt-2 inline-block" to={`/product/${p.handle}`}>View</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
