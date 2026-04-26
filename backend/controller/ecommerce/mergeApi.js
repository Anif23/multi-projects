import { prisma } from "../../config/prisma.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const mergeCart = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!items || !items.length) {
    return res.json({ success: true });
  }

  // get or create cart
  let cart = await prisma.cart.findUnique({
    where: { userId: req.user.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: req.user.id },
    });
  }

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (!product || product.stock <= 0) continue;

    const qty = Math.min(item.quantity, product.stock);

    const existing = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: item.productId,
        },
      },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: Math.min(existing.quantity + qty, product.stock),
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: qty,
        },
      });
    }
  }

  res.json({ success: true, message: "Cart merged" });
});

export const mergeWishlist = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!items || !items.length) {
    return res.json({ success: true });
  }

  // get or create wishlist
  let wishlist = await prisma.wishlist.findUnique({
    where: { userId: req.user.id },
  });

  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: { userId: req.user.id },
    });
  }

  for (const item of items) {
    const exists = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId: item.id,
        },
      },
    });

    if (!exists) {
      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId: item.id,
        },
      });
    }
  }

  res.json({ success: true, message: "Wishlist merged" });
});