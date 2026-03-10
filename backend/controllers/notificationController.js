const Notification = require("../models/Notification");

// Get notifications for the logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate("sender", "name email profilePicFileId")
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      read: false,
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching notifications" });
  }
};

// Mark notification(s) as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === "all") {
      await Notification.updateMany(
        { recipient: req.user.id, read: false },
        { $set: { read: true } }
      );
    } else {
      await Notification.findOneAndUpdate(
        { _id: id, recipient: req.user.id },
        { $set: { read: true } }
      );
    }

    res.status(200).json({ success: true, message: "Notifications updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error updating notifications" });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findOneAndDelete({ _id: id, recipient: req.user.id });
    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting notification" });
  }
};

// Helper function to create notification (internal use)
exports.createNotification = async (data) => {
  try {
    const notification = new Notification(data);
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
