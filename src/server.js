const express = require("express");

const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const config = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDb = require("./config/db");
connectToDb();

app.get("/", (req, res) => {
  res.json("Hello World");
});

//setting up for auth
const authRoute = require("./routes/auth.routes");
app.use("/api/auth", authRoute);

const blogRoute = require("./routes/blog.routes");
app.use("/api/blogs", blogRoute);

const commentRoute = require("./routes/comment.routes");
app.use("/api/blogs/comment", commentRoute);

//Admin routes
const adminUserRoute = require("./routes/admin/users.admin.routes");
app.use("/api/admin/users", adminUserRoute);

const adminBlogRoute = require("./routes/admin/blogs.admin.routes");
app.use("/api/admin/blogs", adminBlogRoute);

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

const port = config.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
