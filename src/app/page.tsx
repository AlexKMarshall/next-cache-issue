import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function Home() {
  function getAddToCart(productId: number) {
    return async function addToCart(data: FormData) {
      "use server";

      const cookieStore = cookies();

      const cart = cookieStore.get("cart")?.value || "{}";
      const cartJson = JSON.parse(cart);

      const quantityToAdd = Number(data.get("quantity"));

      cartJson[productId] = (cartJson[productId] ?? 0) + quantityToAdd;

      // @ts-expect-error - NextJs types aren't updated yet
      cookieStore.set("cart", JSON.stringify(cartJson));

      revalidatePath("/");
      revalidatePath("/cart");
    };
  }

  return (
    <main>
      <h1>Product catalog</h1>

      <ul>
        <li className="p-2">
          <div>
            Product 1
            <form action={getAddToCart(1)}>
              <input type="number" name="quantity" className="border-2 mr-4" />
              <button type="submit">Add to cart</button>
            </form>
          </div>
        </li>
        <li className="p-2">
          <div>
            Product 2
            <form action={getAddToCart(2)}>
              <input type="number" name="quantity" className="border-2 mr-4" />
              <button type="submit">Add to cart</button>
            </form>
          </div>
        </li>
      </ul>
    </main>
  );
}
