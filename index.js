// TODO: Include packages needed for this application
const { prompt } = require("inquirer");
const inquirer = require("inquirer");

const fs = require("fs");
const {
  generateMarkdown,
  renderLicenseBadge,
  renderLicenseLink,
  renderLicenseSection,
} = require("./Develop/utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [];

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the Title of your Project?(Required)",
        validate: (TitleInput) => {
          if (TitleInput) {
            return true;
          } else {
            console.log("Please enter a Title");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Please give of description of the Project.(Required)",
        validate: (descriptionInput) => {
          if (descriptionInput) {
            return true;
          } else {
            console.log("Please enter a description");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "installInstruc",
        message: "What are the installation instructions?(Required)",
        validate: (installInstrucInput) => {
          if (installInstrucInput) {
            return true;
          } else {
            console.log("Please enter the installation instructions");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "usageInfo",
        message: "Write is the usage information?(Required)",
        validate: (usageInfoInput) => {
          if (usageInfoInput) {
            return true;
          } else {
            console.log("Please enter all usage information");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "contriGuide",
        message: "What are the contribution guidelines?",
        validate: (contriGuideInput) => {
          if (contriGuideInput) {
            return true;
          } else {
            console.log("Please enter the contribution guidelines");
            return false;
          }
        },
      },

      {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("Please enter your Github Username");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "repo",
        message: "Enter your Repository Name",
        validate: (repoInput) => {
          if (repoInput) {
            return true;
          } else {
            console.log("Please enter your Repository Name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter your Email.",
        validate: (repoInput) => {
          if (repoInput) {
            return true;
          } else {
            console.log("Please enter your Email.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "test",
        message: "Enter your tests ran in this section.",
        validate: (repoInput) => {
          if (repoInput) {
            return true;
          } else {
            console.log("Please enter your tests for this section.");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "license",
        message: "What license do you want to use?",
        choices: ["MIT", "The Unlicense", "Boost Software License 1.0"],
      },
    ])
    .then((info) => {
      console.log(info);
      const licenseSec = renderLicenseSection(info.license);
      const licenseBad = renderLicenseBadge(
        info.license,
        info.repo,
        info.github
      );
      const licenseLink = renderLicenseLink(info.license);
      info.licenseSec = licenseSec;
      info.licenseBad = licenseBad;
      info.licenseLink = licenseLink;
      const markdown = generateMarkdown(info);
      console.log(markdown);
      writeToFile(markdown);
    });
};
promptUser();

// TODO: Create a function to write README file
function writeToFile(data) {
  fs.writeFile("README.md", data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Page created! Check out  in this directory to see it!");
  });
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
