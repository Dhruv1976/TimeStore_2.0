import User from "../models/user.model.js";

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Token generation failed");
    }
};

export const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body || {};

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = await User.create({ firstName, lastName, email, password });
        const { accessToken, refreshToken } = await generateTokens(newUser._id);

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.status(201).json({
            user: { id: newUser._id, firstName, lastName, email, role: "user" },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('registerUser error', error);
        if (typeof next === 'function') {
            next(error);
        } else {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isValid = await user.isPasswordCorrect(password);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = await generateTokens(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.status(200).json({
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('loginUser error', error);
        if (typeof next === 'function') {
            next(error);
        } else {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
};

export const logoutUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.userId, { refreshToken: "" });
        res.clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ message: "Logged out" });
    } catch (error) {
        console.error('logoutUser error', error);
        if (typeof next === 'function') {
            next(error);
        } else {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
    } catch (error) {
        console.error('getCurrentUser error', error);
        if (typeof next === 'function') {
            next(error);
        } else {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
};

    
