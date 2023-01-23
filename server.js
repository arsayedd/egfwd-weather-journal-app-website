// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

const port = 8080;
const DNS = "127.0.0.1";
function listening() {
  console.log(`Server IP is http://${DNS}:${port}/`);
}
app.listen(port, listening);
//get
app.get("/all", receive);

function receive(request, response) {
  response.send(projectData);
}

//post

app.post("/add", transmission);

function transmission(request, response) {
  const data = request.body;
  console.log("server side data ", data);
  projectData = data;
  response.send(projectData);
}
