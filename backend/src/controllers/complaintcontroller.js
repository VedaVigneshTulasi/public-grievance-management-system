import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const {
      search,
      status,
      department,
      page = 1,
      limit = 5,
    } = req.query;
 
    const query = {};
 
    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }
 
    // Filter by status
    if (status) {
      query.status = status;
    }
 
    // Filter by department
    if (department) {
      query.department = department;
    }
 
    const complaints = await Complaint.find(query)
      .populate("createdBy", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
 
    const totalComplaints = await Complaint.countDocuments(query);
 
    res.status(200).json({
      success: true,
      totalComplaints,
      currentPage: Number(page),
      totalPages: Math.ceil(totalComplaints / limit),
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};