const express = require("express");
const {
  adminGetAllBlogs,
  adminDeleteBlog,
} = require("../../controller/admin/blogs.admin.controller");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { roleMiddleware } = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin", "superadmin"));

router.get("/", adminGetAllBlogs);
router.delete("/:id/delete", adminDeleteBlog);

module.exports = router;
