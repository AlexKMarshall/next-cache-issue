import { cookies } from "next/headers";

const catalog = {
  "1": { name: "Product 1" },
  "2": { name: "Product 2" },
};

export default function Cart() {
  const cart = cookies().get("cart")?.value || "{}";
  const parsedCart: Record<string, number> = JSON.parse(cart);

  const cartCount = Object.values(parsedCart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  return (
    <div>
      <h1 className="text-3xl">Cart ({cartCount})</h1>
      {cartCount === 0 && <div>Cart is empty</div>}
      <ul>
        {Object.entries(parsedCart).map(([productId, quantity]) => (
          <li className="p-2 flex gap-4" key={productId}>
            {/* @ts-ignore - Being lazy */}
            <div>{catalog[productId].name}:</div>
            <div>Quantity: {quantity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
