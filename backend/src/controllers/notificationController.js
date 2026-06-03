const notifications = [
  {
    _id: "notif-1",
    title: "Welcome to the grievance portal",
    message: "Your dashboard is ready. Check complaint statuses and updates here.",
    isRead: false,
    createdAt: new Date(),
  },
  {
    _id: "notif-2",
    title: "Reminder",
    message: "Please keep your contact details updated for faster responses.",
    isRead: false,
    createdAt: new Date(),
  },
];

export const getNotifications = async (req, res) => {
  res.status(200).json({
    success: true,
    notifications,
  });
};

export const markNotificationAsRead = async (req, res) => {
  const notification = notifications.find(
    (item) => item._id === req.params.id
  );

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  notification.isRead = true;

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    notification,
  });
};
