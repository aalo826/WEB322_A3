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

const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

const initialize = () => {
  return new Promise((resolve, reject) => {
    try {
      projectData.forEach((project) => {
        let sector = sectorData.find((sector) => sector.id === project.sector_id);
        if (!sector) {
          console.warn(`No sector found for project with ID: ${project.id}`);
        }
        let projectCopy = { ...project, sector: sector ? sector.sector_name : "Unknown" };
        projects.push(projectCopy);
      });
      resolve(); // Successfully filled the projects array
    } catch (error) {
      reject(`Error initializing projects: ${error}`);
    }
  });
};

const getAllProjects = () => {
  return new Promise((resolve, reject) => {
    if (projects.length === 0) {
      reject("No projects available.");
    } else {
      resolve(projects);
    }
  });
};

const getProjectById = (projectId) => {
  return new Promise((resolve, reject) => {
    const project = projects.find((project) => project.id === projectId);
    if (project) {
      resolve(project);
    } else {
      reject(`Unable to find project with ID: ${projectId}`);
    }
  });
};

const getProjectsBySector = (sector) => {
  return new Promise((resolve, reject) => {
    const result = projects.filter((project) =>
      project.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (result.length > 0) {
      resolve(result);
    } else {
      reject(`Unable to find projects in the sector: ${sector}`);
    }
  });
};

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };



