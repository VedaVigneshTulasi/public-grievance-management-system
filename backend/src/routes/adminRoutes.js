import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
  getAllComplaintsAdmin,
  updateComplaintStatus,
  addRemark,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);

router.use(roleMiddleware("admin"));

router.get("/complaints", getAllComplaintsAdmin);

router.patch("/status/:id", updateComplaintStatus);

router.post("/remarks/:id", addRemark);

export default router;