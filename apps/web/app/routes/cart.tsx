import { Card, Button } from "@poody/ui";

export default function Cart() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-pink-700 mb-4">Your Cart</h1>
      <Card className="p-6">
        <p className="mb-4">Cart is empty (mock). Checkout integrates with Shopify redirect.</p>
        <Button variant="primary" disabled aria-disabled>
          Checkout
        </Button>
      </Card>
    </div>
  );
}

