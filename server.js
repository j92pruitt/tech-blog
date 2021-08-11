const express = require('express');

// Initialize express app and set up port.
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing requests
app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );

app.listen( PORT, () => console.log(`Listening on port: ${PORT}`) );