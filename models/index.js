const Comment = require("./Comment");
const Blog = require("./Blog");
const User = require("./User");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {User, Blog, Comment}