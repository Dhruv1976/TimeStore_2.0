import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
    const { orderId, items, total, shipping, paymentMethod } = req.body;

    if (!orderId || !items || !total || !shipping) {
        throw new ApiError(400, "All fields are required");
    }

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            throw new ApiError(404, `Product ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
            throw new ApiError(400, `Insufficient stock for ${product.title}. Available: ${product.stock}, Ordered: ${item.quantity}`);
        }
        product.stock -= item.quantity;
        await product.save();
    }

    const order = await Order.create({
        orderId,
        userId: req.user._id,
        items,
        total,
        shipping,
        paymentMethod: paymentMethod || "cod",
        status: "pending",
    });

    return res
        .status(201)
        .json(new ApiResponse(201, order, "Order created successfully"));
});

export const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).populate("items.productId");

    return res
        .status(200)
        .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.productId");

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        throw new ApiError(403, "Not authorized to view this order");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, order, "Order fetched successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admins can view all orders");
    }

    const orders = await Order.find().populate("userId items.productId");

    return res
        .status(200)
        .json(new ApiResponse(200, orders, "All orders fetched successfully"));
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admins can update order status");
    }

    const order = await Order.findById(id);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (status === "cancelled" && order.status !== "cancelled") {
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }
    }

    order.status = status;
    await order.save();

    return res
        .status(200)
        .json(new ApiResponse(200, order, "Order status updated successfully"));
});
