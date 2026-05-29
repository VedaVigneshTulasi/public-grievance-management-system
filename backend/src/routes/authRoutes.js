import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation.js";

import validateMiddleware from "../middlewares/validateMiddleware.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validateMiddleware,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validateMiddleware,
  loginUser
);

router.get("/profile", authMiddleware, getUserProfile);

export default router;