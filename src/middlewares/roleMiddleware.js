const AppError = require("../utils/appError");

exports.roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, "Not authorized"));
    }
    next();
  };
};
