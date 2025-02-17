/********************************************************************************
 *  WEB322 – Assignment 03
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Aaron  Lo Student ID: 111918249 Date: 2/16/2025
 *
 ********************************************************************************/

const projectData = require("./modules/projects");
const express = require("express");
const path = require("path");
const app = express();

const stuInfo = {
  name: "Aaron Lo",
  stuNum: "111918249",
};

// Related middleware to be able to parse the request body.
app.use(express.json());

// Makes files accessible in the "public" folder
app.use(express.static("public"));

// Initialize the projects (this will populate the projects array)
projectData
  .initialize()
  // If promise is resolved THEN
  .then(() => {
    console.log("Projects initialized successfully.");
    // Server starts
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  // Promise is rejected
  .catch((error) => {
    console.error("Error initializing projects:", error);
  });

// Route for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "home.html"));
});

// Route for about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "about.html"));
});

// Route for 404 page
app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "404.html"));
});

// GET "/solutions/projects"
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector; //

  //  Filter projects based on the sector if given
  if (sector) {
    projectData
      .getProjectsBySector(sector)
      .then((projects) => {
        const currentTime = new Date().toLocaleString();
        res.json({
          studentName: stuInfo.name,
          studentId: stuInfo.stuNum,
          timestamp: currentTime,
          projects: projects,
        });
      })
      .catch((error) => {
        // Send 404 status and load the 404.html page if error
        res.status(404).sendFile(path.join(__dirname, "public", "views", "404.html"))
      });
  } else {
    // Gives all projects if sector not given
    projectData
      .getAllProjects()
      // If promise is resolved THEN
      .then((projects) => {
        const currentTime = new Date().toLocaleString();
        res.json({
          studentName: stuInfo.name,
          studentId: stuInfo.stuNum,
          timestamp: currentTime,
          projects: projects,
        });
      })
      // Promise is rejected
      .catch((error) => {
        // Send 404 status and load the 404.html page if error
        res.status(404).sendFile(path.join(__dirname, "public", "views", "404.html"));
      });
  }
});

// GET "/solutions/projects/id-demo"
app.get("/solutions/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id, 10); // Convert from string to integer
  projectData
    .getProjectById(projectId)
    // If promise is resolved THEN
    .then((project) => {
      const currentTime = new Date().toLocaleString();
      res.json({
        studentName: stuInfo.name,
        studentId: stuInfo.stuNum,
        timestamp: currentTime,
        project: project,
      });
    })
    // Promise is rejected
    .catch((error) => {
      // Send 404 status and load the 404.html page if error
      res.status(404).sendFile(path.join(__dirname, "public", "views", "404.html"));
    });
});

// POST Route
app.post("/post-request", (req, res) => {
  const currentTime = new Date().toLocaleString();
  res.json({
    studentName: stuInfo.name,
    studentId: stuInfo.stuNum,
    timestamp: currentTime,
    requestBody: req.body,
  });
});


module.exports = app;
