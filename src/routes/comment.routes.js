const express = require("express");
const {
  getBlogComment,
  addComment,
  updateBlogComment,
  deleteComment,
} = require("../controller/comment.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validate");
const { CommentSchema } = require("../validator/comment.validator");

const router = express.Router();

router.get("/:blogId", getBlogComment);
router.post(
  "/:blogId",
  authMiddleware,
  roleMiddleware("user", "admin", "superadmin"),
  validate(CommentSchema),
  addComment
);
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("user", "admin", "superadmin"),
  validate(CommentSchema),
  updateBlogComment
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("user", "admin", "superadmin"),
  deleteComment
);

module.exports = router;
