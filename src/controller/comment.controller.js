const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const AppError = require("../utils/appError");

exports.addComment = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;
    const user = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) return next(new AppError(404, "Blog not Found"));

    const comment = await Comment.create({
      content,
      blog: blogId,
      author: user,
    });

    res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

exports.getBlogComment = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) return next(new AppError(404, "Blog not Found"));

    const comments = await Comment.find({ blog: blogId }).populate(
      "author",
      "username email"
    );

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

exports.updateBlogComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) return next(new AppError(404, "Comment not found"));

    comment.content = content;

    await comment.save();

    res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) return next(new AppError(404, "Comment not found"));

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};
