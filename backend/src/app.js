import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

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

app.use("/api/v1/complaints", complaintRoutes);

app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

export default app;