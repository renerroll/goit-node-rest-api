import multer from "multer";
import path from "node:path";
import fs from "fs";

const tempDir = path.resolve("temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: "tempDir",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage });
