import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.patch("/:id", authMiddleware, markNotificationAsRead);

export default router;
