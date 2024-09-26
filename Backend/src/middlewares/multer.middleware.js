import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory
export const upload = multer({ storage });
