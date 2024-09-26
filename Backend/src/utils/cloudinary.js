import cloudinary from "cloudinary";
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

const uploadOnCloudinary = async (fileBuffer, fileName) => {
    try {
        const response = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(
                { resource_type: "auto", public_id: fileName },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(fileBuffer); // End the stream with the file buffer
        });

        return response;
    } catch (error) {
        console.error("Cloudinary upload error", error);
        throw error; // Throw to catch in route handler
    }
};

// Exporting the cloudinary instance and the upload function
export { cloudinary, uploadOnCloudinary };
