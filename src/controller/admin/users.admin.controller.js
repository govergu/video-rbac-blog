const User = require("../../models/user.models");
const AppError = require("../../utils/appError");

exports.banUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) return next(new AppError(404, "User not Found"));

    if (user.role === "superadmin") {
      return next(new AppError(403, "Not allowed to ban"));
    }
    user.isBanned = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${userId} is Banned successfully`,
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

exports.unBanUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) return next(new AppError(404, "User not Found"));

    user.isBanned = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${userId} is Unbanned successfully`,
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};
