const Blog = require("../../models/blog.model");
const AppError = require("../../utils/appError");

exports.adminDeleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return next(new AppError(404, "Blog not Found"));

    await blog.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Blog Deleted Permanently" });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

exports.adminGetAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (blogs.length === 0)
      return next(new AppError(404, "Blogs not available"));

    res.status(200).json({ blogs });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};
