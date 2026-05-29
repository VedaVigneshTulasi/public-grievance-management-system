import { body } from "express-validator";

export const complaintValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("department")
    .notEmpty()
    .withMessage("Department is required"),

  body("location")
    .notEmpty()
    .withMessage("Location is required"),
];