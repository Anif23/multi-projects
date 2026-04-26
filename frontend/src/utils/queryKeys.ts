// utils/queryKeys.ts
export const qk = {
  userProducts: ["user-products"],
  userCategories: ["user-categories"],
  product: (id: number) => ["product", id],

  cart: ["cart"],
  orders: ["orders"],
  wishlist: ["wishlist"],

  adminProducts: ["admin-products"],
  adminCategories: ["admin-categories"],
  adminOrders: ["admin-orders"]
};