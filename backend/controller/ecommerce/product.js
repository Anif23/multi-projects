import { prisma } from "../../config/prisma.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { createProductSchema, updateProductSchema } from "../../validations/ecommerce.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { deleteFiles } from "../../utils/deleteFiles.js";

export const productController = {

    getProducts: asyncHandler(async (req, res) => {
        const { search, categoryId, isActive } = req.query;

        const userId = req.user?.id;

        const products = await prisma.product.findMany({
            where: {
                ...(search && {
                    name: { contains: search, mode: "insensitive" },
                }),
                ...(categoryId && { categoryId: Number(categoryId) }),
                ...(isActive && { isActive: isActive === "true" }),
            },
            include: {
                category: true,
                images: true,
                wishlistItems: userId
                    ? {
                        where: {
                            wishlist: {
                                userId: userId,
                            },
                        },
                        select: { id: true },
                    }
                    : false,
            },
            orderBy: { createdAt: "desc" },
        });

        const result = products.map((p) => ({
            ...p,
            isWishlisted: userId ? p.wishlistItems.length > 0 : false,
        }));
        res.json({
            success: true,
            data: result,
        });
    }),

    createProduct: asyncHandler(async (req, res) => {
        const body = createProductSchema.parse(req.body);
        const slug = slugify(body.name, { lower: true, strict: true });
        
        // check category
        const category = await prisma.category.findUnique({
            where: { id: body.categoryId }
        });

        const existingProduct = await prisma.product.findFirst({
            where: { slug }
        });

        if (existingProduct) {
            throw new ApiError(400, "Product with this name already exists");
        }

        if (!category) {
            throw new ApiError(404, "Category not found");
        }

        const imageUrls =
            req.files?.map((file) => ({
                url: `http://localhost:8000/uploads/${file.filename}`
            })) || [];

        const product = await prisma.product.create({
            data: {
                name: body.name,
                slug,
                description: body.description,
                price: body.price,
                stock: body.stock,
                isActive: body.isActive ?? true,
                categoryId: body.categoryId,

                images: {
                    create: imageUrls
                }
            },
            include: {
                images: true,
                category: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    }),

    updateProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const productId = Number(id);

        const body = updateProductSchema.parse(req.body);

        // find product
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
            include: { images: true }
        });

        if (!existingProduct) {
            deleteFiles(req.files);
            throw new ApiError(404, "Product not found");
        }
       
        // find category
        if (body.categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: body.categoryId }
            });

            if (!category) {
                deleteFiles(req.files);
                throw new ApiError(404, "Category not found");
            }
        }

        // if slug change
        let slug;
        if (body.name) {
            slug = slugify(body.name, { lower: true, strict: true });

            const duplicate = await prisma.product.findFirst({
                where: {
                    slug,
                    NOT: { id: productId }
                }
            });

            if (duplicate) {
                deleteFiles(req.files);
                throw new ApiError(400, "Product with this name already exists");
            }
        }

        // 🔥 DELETE OLD IMAGES
        let deleteIds = body.deleteImages;

        if (deleteIds) {
            if (!Array.isArray(deleteIds)) {
                deleteIds = [deleteIds];
            }

            const imagesToDelete = existingProduct.images.filter(img =>
                deleteIds.includes(img.id)
            );

            // delete from disk
            imagesToDelete.forEach(img => {
                const filePath = path.join(
                    "uploads",
                    img.url.split("/uploads/")[1]
                );

                fs.unlink(filePath, err => {
                    if (err) console.error(err);
                });
            });

            // delete from DB
            await prisma.productImage.deleteMany({
                where: {
                    id: { in: deleteIds }
                }
            });
        }

        // add new image
        const newImages =
            req.files?.map(file => ({
                url: `http://localhost:8000/uploads/${file.filename}`
            })) || [];

        // update product
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                ...(body.name && { name: body.name }),
                ...(slug && { slug }),
                ...(body.description !== undefined && {
                    description: body.description
                }),
                ...(body.price !== undefined && { price: body.price }),
                ...(body.stock !== undefined && { stock: body.stock }),
                ...(body.isActive !== undefined && {
                    isActive: body.isActive
                }),
                ...(body.categoryId && { categoryId: body.categoryId }),

                images: {
                    create: newImages
                }
            },
            include: {
                images: true,
                category: true
            }
        });

        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    }),

    deleteProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;

        await prisma.product.delete({
            where: { id: Number(id) }
        });

        res.json({
            success: true,
            message: "Product deleted"
        });
    }),

    getProductById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user?.id;

        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: {
                category: true,
                images: true,

                wishlistItems: userId
                    ? {
                        where: {
                            wishlist: {
                                userId,
                            },
                        },
                        select: { id: true },
                    }
                    : false,
            },
        });

        if (!product) throw new ApiError(404, "Product not found");

        res.json({
            success: true,
            data: {
                ...product,
                isWishlisted: userId ? product.wishlistItems.length > 0 : false,
            },
        });
    })
};