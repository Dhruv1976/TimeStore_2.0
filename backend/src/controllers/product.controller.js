import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const getAllProducts = asyncHandler(async (req, res) => {
    const { search, brand, gender, color, type, minPrice = 0, maxPrice = Infinity, sort = "-createdAt" } = req.query;
    const { page, limit, skip } = req.pagination;
    
    const filter = {};
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { brand: { $regex: search, $options: "i" } },
            { type: { $regex: search, $options: "i" } },
            { color: { $regex: search, $options: "i" } },
        ];
    }
    
    if (brand) {
        const brands = brand.split(',').map(b => b.trim());
        filter.brand = brands.length > 1 ? { $in: brands } : brands[0];
    }
    if (gender) {
        const genders = gender.split(',').map(g => g.trim());
        filter.gender = genders.length > 1 ? { $in: genders } : genders[0];
    }
    if (color) {
        const colors = color.split(',').map(c => c.trim());
        filter.color = colors.length > 1 ? { $in: colors } : colors[0];
    }
    if (type) {
        const types = type.split(',').map(t => t.trim());
        filter.type = types.length > 1 ? { $in: types } : types[0];
    }

    if (minPrice > 0 || maxPrice < Infinity) {
        filter.price = {};
        if (minPrice > 0) filter.price.$gte = Number(minPrice);
        if (maxPrice < Infinity) filter.price.$lte = Number(maxPrice);
    }
    
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "firstName lastName email");

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                products,
                pagination: {
                    ...req.pagination,
                    total,
                    pages: Math.ceil(total / req.pagination.limit),
                },
            },
            "Products fetched successfully"
        )
    );
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ featured: true })
        .populate("createdBy", "firstName lastName email")
        .limit(6)
        .sort("-createdAt");
    
    return res.status(200).json(
        new ApiResponse(200, products, "Featured products fetched successfully")
    );
});

export const getFilterOptions = asyncHandler(async (req, res) => {
    
    const [brands, genders, colors, types, priceStats] = await Promise.all([
        Product.distinct("brand"),
        Product.distinct("gender"),
        Product.distinct("color"),
        Product.distinct("type"),
        Product.aggregate([
            {
                $group: {
                    _id: null,
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" }
                }
            }
        ])
    ]);

    const { minPrice = 0, maxPrice = 10000000 } = priceStats[0] || {};

    return res.status(200).json(
        new ApiResponse(200, {
            brands: brands.filter(b => b),
            genders: genders.filter(g => g),
            colors: colors.filter(c => c),
            types: types.filter(t => t),
            priceRange: { minPrice: Math.floor(minPrice), maxPrice: Math.ceil(maxPrice) }
        }, "Filter options fetched successfully")
    );
});

export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate("createdBy", "firstName lastName email");
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product fetched successfully"));
});

export const getProductSuggestions = asyncHandler(async (req, res) => {
    const query = (req.query.q || "").trim();

    if (!query) {
        return res.status(200).json(new ApiResponse(200, { suggestions: [] }, "No query"));
    }

    const regex = new RegExp(query, "i");

    const suggestions = await Product.find({
        $or: [
            { title: regex },
            { brand: regex },
            { type: regex },
            { color: regex }
        ]
    })
        .limit(8)
        .select("title brand")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, { suggestions }, "Suggestions fetched successfully"));
});

export const createProduct = asyncHandler(async (req, res) => {
    const { title, brand, type, color, gender, price, stock, description, featured } = req.body;

    if (!title || !brand || !type || !color || !price) {
        throw new ApiError(400, "All required fields must be provided");
    }

    let imageUrl = "";

    if (req.file) {
        try {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (cloudinaryResponse) {
                imageUrl = cloudinaryResponse.secure_url;
            }
        } catch (error) {
            throw new ApiError(500, "Error uploading image to Cloudinary: " + error.message);
        }
    }


    const product = await Product.create({
        title: title.trim(),
        brand: brand.trim(),
        type: type.trim(),
        color: color.trim(),
        gender: gender || "Unisex",
        price: Number(price),
        stock: Number(stock) || 0,
        description: description || "",
        featured: featured === "true" || featured === true,
        image: imageUrl,
        createdBy: req.user?._id || null, 
    });



    const populatedProduct = await product.populate("createdBy", "firstName lastName email");

    return res
        .status(201)
        .json(new ApiResponse(201, populatedProduct, "Product created successfully"));
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
const { title, brand, type, color, gender, price, stock, description, featured } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let updateData = {
        title: title ? title.trim() : product.title,
        brand: brand ? brand.trim() : product.brand,
        type: type ? type.trim() : product.type,
        color: color ? color.trim() : product.color,
        gender: gender || product.gender,
        price: price ? Number(price) : product.price,
        stock: stock !== undefined ? Number(stock) : product.stock,
        description: description !== undefined ? description.trim() : product.description,
        featured: featured !== undefined ? (featured === "true" || featured === true) : product.featured,
    };

    if (req.file) {
        try {
            if (product.image) {
                await deleteFromCloudinary(product.image);
            }

            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (cloudinaryResponse) {
                updateData.image = cloudinaryResponse.secure_url;
            }
        } catch (error) {
            throw new ApiError(500, "Error uploading image to Cloudinary: " + error.message);
        }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate(
        "createdBy",
        "firstName lastName email"
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admins can delete products");
    }

    if (product.image) {
        try {
            await deleteFromCloudinary(product.image);
        } catch (error) {
            console.error("Error deleting image from Cloudinary:", error);
        }
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
});
