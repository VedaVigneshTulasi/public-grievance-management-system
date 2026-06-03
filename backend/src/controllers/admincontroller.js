import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import Department from "../models/Department.js";

export const getAllComplaintsAdmin = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.status = status;

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint status updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addRemark = async (req, res) => {
  try {
    const { text } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.remarks.push({
      text,
      addedBy: req.user._id,
    });

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Remark added successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========== USER MANAGEMENT ==========
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["citizen", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========== DEPARTMENT MANAGEMENT ==========
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json({
      success: true,
      count: departments.length,
      departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, description, email, phone, head } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    const department = await Department.create({
      name,
      description,
      email,
      phone,
      head,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========== REPORTS ==========
export const getSystemReports = async (req, res) => {
  try {
    const { range } = req.query;

    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: "Resolved" });
    const pendingComplaints = await Complaint.countDocuments({ status: "Pending" });
    const inProgressComplaints = await Complaint.countDocuments({ status: "In Progress" });
    const totalUsers = await User.countDocuments();
    const totalDepartments = await Department.countDocuments();

    res.status(200).json({
      success: true,
      reports: {
        totalComplaints,
        resolvedComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolutionRate: totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0,
        totalUsers,
        totalDepartments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========== SETTINGS ==========
export const getSystemSettings = async (req, res) => {
  try {
    const settings = {
      appName: "Public Grievance Management System",
      maxUploadSize: 5,
      enableNotifications: true,
      maintenanceMode: false,
      supportEmail: "support@grievance.gov",
    };

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSystemSettings = async (req, res) => {
  try {
    const updates = req.body;

    const settings = {
      appName: updates.appName || "Public Grievance Management System",
      maxUploadSize: updates.maxUploadSize || 5,
      enableNotifications: updates.enableNotifications !== undefined ? updates.enableNotifications : true,
      maintenanceMode: updates.maintenanceMode !== undefined ? updates.maintenanceMode : false,
      supportEmail: updates.supportEmail || "support@grievance.gov",
    };

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========== ASSIGN DEPARTMENT ==========
export const assignDepartment = async (req, res) => {
  try {
    const { department } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { department },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
