import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import validateMiddleware from "../middlewares/validateMiddleware.js";

import { complaintValidation } from "../validations/complaintValidation.js";

import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  complaintValidation,
  validateMiddleware,
  createComplaint
);

router.get("/", authMiddleware, getComplaints);

router.get("/:id", authMiddleware, getComplaintById);

router.put("/:id", authMiddleware, updateComplaint);

router.delete("/:id", authMiddleware, deleteComplaint);

export default router;