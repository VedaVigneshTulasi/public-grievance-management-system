import Complaint from "../models/Complaint.js";
 
export const getDashboardStats = async (req, res) => {

  try {

    const totalComplaints = await Complaint.countDocuments();
 
    const pendingComplaints = await Complaint.countDocuments({

      status: "Pending",

    });
 
    const resolvedComplaints = await Complaint.countDocuments({

      status: "Resolved",

    });
 
    const rejectedComplaints = await Complaint.countDocuments({

      status: "Rejected",

    });
 
    const inProgressComplaints = await Complaint.countDocuments({

      status: "In Progress",

    });
 
    res.status(200).json({

      success: true,
 
      stats: {

        totalComplaints,

        pendingComplaints,

        resolvedComplaints,

        rejectedComplaints,

        inProgressComplaints,

      },

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
 
export const getStatusReport = async (req, res) => {

  try {

    const report = await Complaint.aggregate([

      {

        $group: {

          _id: "$status",

          count: { $sum: 1 },

        },

      },

    ]);
 
    res.status(200).json({

      success: true,

      report,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
 
export const getDepartmentReport = async (req, res) => {

  try {

    const report = await Complaint.aggregate([

      {

        $group: {

          _id: "$department",

          count: { $sum: 1 },

        },

      },

    ]);
 
    res.status(200).json({

      success: true,

      report,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
 