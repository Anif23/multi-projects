import { asyncHandler } from "../../utils/AsyncHandler.js";
import { prisma } from "../../config/prisma.js";

export const updateWishlist = asyncHandler(async (req, res) => {
  const productId = Number(req.params.productId);

  if (!productId || isNaN(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  let wishlist = await prisma.wishlist.findUnique({
    where: { userId: req.user.id },
  });

  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: { userId: req.user.id },
    });
  }

  const existing = await prisma.wishlistItem.findUnique({
    where: {
      wishlistId_productId: {
        wishlistId: wishlist.id,
        productId,
      },
    },
  });

  if (existing) {
    await prisma.wishlistItem.delete({
      where: { id: existing.id },
    });

    return res.json({ message: "Removed from wishlist" });
  }

  await prisma.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId,
    },
  });

  res.json({ message: "Added to wishlist" });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const wishlist = await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
              category: true,
            },
          },
        },
      },
    },
  });

  if (!wishlist) {
    return res.json({
      success: true,
      data: [],
    });
  }

  const result = wishlist.items.map((item) => ({
    id: item.id,
    product: {
      ...item.product,
      isWishlisted: true,
    },
  }));

  res.json({
    success: true,
    data: result,
  });
});