const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init(
    {

        content: {
            type: DataTypes.TEXT
        }

    },

    {
        sequelize,
        modelName: 'Comment'
    }
);

module.exports = Comment