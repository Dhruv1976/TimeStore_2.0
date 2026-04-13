import asyncHandler from "../utils/asyncHandler.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1, price, title, image } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    if (product.stock < quantity) {
        throw new ApiError(400, `Insufficient stock. Available: ${product.stock}, Requested: ${quantity}`);
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [{ productId, quantity, price, title, image }]
        });
    } else {
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price, title, image });
        }
    }

    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();


    cart = await cart.populate("items.productId", "title price image stock");

    res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
});

const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.productId", "title price image stock");
    
    if (!cart) {
        return res.status(200).json(new ApiResponse(200, { items: [], totalQuantity: 0, totalPrice: 0 }, "Empty cart"));
    }

    res.status(200).json(new ApiResponse(200, cart, "Cart retrieved"));
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    await cart.populate("items.productId", "title price image stock");

    res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
});

const updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
        throw new ApiError(404, "Item not found");
    }

    item.quantity = quantity;
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    await cart.populate("items.productId", "title price image stock");

    res.status(200).json(new ApiResponse(200, cart, "Cart updated"));
});

const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ userId });

    res.status(200).json(new ApiResponse(200, {}, "Cart cleared"));
});

export { addToCart, getCart, removeFromCart, updateCartItem, clearCart };

