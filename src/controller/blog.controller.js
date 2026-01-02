const Blog = require("../models/blog.model");
const AppError = require("../utils/appError");

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (blogs.length === 0)
      return next(new AppError(404, "Blogs not available"));

    res.status(200).json({ blogs });
  } catch (error) {
    next(new AppError(500, error.message));
    // res.status(500).json({ error: error.message });
  }
};
exports.getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) return next(new AppError(404, "Blog not available"));

    res.status(200).json({ blog });
  } catch (error) {
    next(new AppError(500, error.message));
    // res.status(500).json({ error: error.message });
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    const blog = await Blog.create({
      title,
      content,
      user: userId,
    });

    res.status(200).json({ blog });
  } catch (error) {
    next(new AppError(500, error.message));
    // res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return next(new AppError(404, "Blog not available"));

    const isOwner = blog.user.toString() === req.user._id.toString();
    if (!isOwner) return next(new AppError(403, "Not the Owner of Blog"));

    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();

    res.status(200).json({ message: "Blog Updated Successfully", blog });
  } catch (error) {
    next(new AppError(500, error.message));
    // res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return next(new AppError(404, "Blog not Found"));
    const isOwner = blog.user.toString() === req.user._id.toString();
    if (!isOwner) return next(new AppError(403, "Not the Owner of Blog"));

    blog.isDeleted = true;

    await blog.save();

    res.status(200).json({ message: "Blog Deleted successfully" });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(new AppError(500, error.message));
  }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const blog = await Blog.findById(id);

    if (!blog) return next(new AppError(404, "Blog not Found"));

    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      blog.likes.pull(userId);
    } else {
      blog.likes.push(userId);
    }
    await blog.save();

    res.status(200).json({
      status: "success",
      liked: !isLiked,
      count: blog.likes.length,
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};
