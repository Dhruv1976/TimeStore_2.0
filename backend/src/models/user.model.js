import mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        phone: { type: String, default: "" },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        refreshToken: { type: String, default: "" },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export default mongoose.model("User", userSchema);