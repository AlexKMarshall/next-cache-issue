A 2 page app, with a shared layout component

`/layout.tsx` reads the cart from the cookies to display a link to the cart and the number of items
`/page.tsx` uses a server action to add items to the cart cookie. The action calls `revalidatePath('/')` and `revalidatePath('/cart')`
`/cart/page.tsx` reads the cart from the cookie to render the cart items in a list

When we add to the cart, the display in `layout.tsx` updates to the correct value.

But the cart page isn't updated to the latest values of the cart. Only a hard refresh causes an update.

https://app.claap.io/qogita/dynamic-page-caching-incorrectly-c-n6eMJcyi6K-4Bqmv2HWPHvE
