const express = require("express");
const {
  banUser,
  unBanUser,
} = require("../../controller/admin/users.admin.controller");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { roleMiddleware } = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin", "superadmin"));

router.patch("/:userId/ban-user", banUser);
router.patch("/:userId/un-ban-user", unBanUser);

module.exports = router;
