import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config( {path: './.env'} );

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "timestore/products",
        });

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return null;

        const parts = imageUrl.split("/");
        const filename = parts[parts.length - 1].split(".")[0];
        const publicId = `timestore/products/${filename}`;

        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return false;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
