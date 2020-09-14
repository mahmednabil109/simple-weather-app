// Setup empty JS object to act as endpoint for all routes
projectData = {};


//imporing uuid for secure keys of the entries
const { v4: uuidv4 } = require('uuid');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// route to retrive all the saved data
app.get('/all', (req, res) => {
    res.send(projectData);
});
// route to add new data to be saved
app.post('/addEntry', (req, res) => {
    projectData = {...req.body, key: uuidv4() };
    res.send(projectData);
});

// Setup Server
const port = 3000;
const server = app.listen(port, () => console.log(`server is running at http://localhost:${port}`));