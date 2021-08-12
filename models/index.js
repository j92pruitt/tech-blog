const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {User, Post, Comment}