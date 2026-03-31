import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                title: String,
                price: Number,
                quantity: Number,
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        shipping: {
            fullName: String,
            email: String,
            address: String,
            city: String,
            postalCode: String,
            country: String,
            phone: String,
        },
        paymentMethod: {
            type: String,
            enum: ["cod", "card", "upi"],
            default: "cod",
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
