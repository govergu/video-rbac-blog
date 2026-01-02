const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
} = require("../controller/blog.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validate");
const { BlogSchema } = require("../validator/blog.validator");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("user", "admin", "superadmin"),
  validate(BlogSchema),
  createBlog
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("user", "admin", "superadmin"),
  validate(BlogSchema),
  updateBlog
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("user", "admin", "superadmin"),
  deleteBlog
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("user", "admin", "superadmin"),
  toggleLike
);

module.exports = router;
