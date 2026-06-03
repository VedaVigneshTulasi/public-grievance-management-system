import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
  getAllComplaintsAdmin,
  updateComplaintStatus,
  addRemark,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getSystemReports,
  getSystemSettings,
  updateSystemSettings,
  assignDepartment,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);

router.use(roleMiddleware("admin"));

router.get("/complaints", getAllComplaintsAdmin);

router.patch("/status/:id", updateComplaintStatus);

router.post("/remarks/:id", addRemark);

router.patch("/assign-department/:id", assignDepartment);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/role", updateUserRole);

router.get("/departments", getAllDepartments);
router.post("/departments", createDepartment);
router.patch("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

router.get("/reports", getSystemReports);
router.get("/settings", getSystemSettings);
router.patch("/settings", updateSystemSettings);

export default router;
