require('dotenv').config();

const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {

    try {
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error(error)        
    }

    try {
        
        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

    } catch (error) {
        console.error(error);
    }

    process.exit(0);
};

seedDatabase();