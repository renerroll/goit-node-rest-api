import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./db/index.js";
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

await connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
