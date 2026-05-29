import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Public Grievance API Running",
  });
});

app.use("/api/v1/auth", authRoutes);

export default app;