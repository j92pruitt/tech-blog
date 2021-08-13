require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers')

const sequelize = require('./config/connection');

async function init() {
    // Initialize express app and set up port.
    const app = express();
    const PORT = process.env.PORT || 3001;

    // Initialize Handlebars engine and set app's view engine to handlebars.
    const hbs = exphbs.create();
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // Middleware for parsing requests
    app.use( express.json() );
    app.use( express.urlencoded( {extended: true} ) );

    app.use(routes);

    // Initialize database connection
    try {

        await sequelize.sync( {force: false} )

    } catch (error) {
        console.error(error)
    }

    app.listen( PORT, () => console.log(`Listening on port: ${PORT}`) );
}

init();