import express from "express";
 
import authMiddleware from "../middlewares/authMiddleware.js";
 
import roleMiddleware from "../middlewares/roleMiddleware.js";
 
import {

  getDashboardStats,

  getStatusReport,

  getDepartmentReport,

} from "../controllers/dashboardController.js";
 
const router = express.Router();
 
router.use(authMiddleware);
 
router.use(roleMiddleware("admin"));
 
router.get("/stats", getDashboardStats);
 
router.get("/status-report", getStatusReport);
 
router.get("/department-report", getDepartmentReport);
 
export default router;
 