const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const mysql = require('mysql2');

const makePageHead = require("./src/makePageHead.js");
const makePageTail = require("./src/makePageTail.js");
const makeEngineer = require("./src/makeEngineer.js");
const makeManager = require("./src/makeManager.js");
const makeIntern = require("./src/makeIntern.js");
const makeCss = require("./src/makeCSS.js");

const Intern = require("./lib/classIntern.js");
const Engineer = require("./lib/classEngineer.js");
const Manager = require("./lib/classManager.js");
const { resolve } = require("path");


const team = [];

const actionQuestion = [
    // What would you like to
    {
        type: "list",
        name: "action",
        message: "What would you like to?", //
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    }
    ,
];

const managerQuestions = [
    // Manager prompts
    {
        type: "input",
        name: "name",
        message: "What is this manager's name?" //
    }
    ,
    {
        type: "input",
        name: "id",
        message: "What is this manager's ID?" //
    }
    ,
    {
        type: "input",
        name: "email",
        message: "What is this manager's email?" //
    }
    ,
    {
        type: "input",
        name: "managerOffice",
        message: "What is this manager's office number?" //
    }
    ,
];

const engineerQuestions = [
    // < Group
    // Engineer prompts
    {
        type: "input",
        name: "name",
        message: "What is this engineer's name?" //
    }
    ,
    {
        type: "input",
        name: "id",
        message: "What is this engineer's ID?" //
    }
    ,
    {
        type: "input",
        name: "email",
        message: "What is this engineer's email?" //
    }
    ,
    {
        type: "input",
        name: "engineerGit",
        message: "What is this engineer's GitHub username?" //
    }
    ,
];

const internQuestions = [
    // < Group
    // Intern prompts
    {
        type: "input",
        name: "name",
        message: "What is this intern's name?" //
    }
    ,
    {
        type: "input",
        name: "id",
        message: "What is this intern's ID?" //
    }
    ,
    {
        type: "input",
        name: "email",
        message: "What is this intern's email?" //
    }
    ,
    {
        type: "input",
        name: "internSchool",
        message: "What is this intern's school?" //
    }
    ,
];



//============================ Prompts
function promptManager() {
    inquirer
        .prompt(managerQuestions)
        .then((response) => {
            let role = { role: "Manager" };
            response = { ...response, ...role };
            var newMember = new Manager(response.name, response.id, response.email, response.managerOffice, response.role);
            team.push(newMember);
        })
        .then(() => {
            addTeamMember();
        });
}

function promptEngineer() {
    inquirer
        .prompt(engineerQuestions)
        .then((response) => {
            let role = { role: "Engineer" };
            response = { ...response, ...role };
            var newMember = new Engineer(response.name, response.id, response.email, response.engineerGit, response.role);
            team.push(newMember);
        })
        .then(() => {
            addTeamMember();
        });
}

function promptIntern() {
    inquirer
        .prompt(internQuestions)
        .then((response) => {
            let role = { role: "Intern" };
            response = { ...response, ...role };
            var newMember = new Intern(response.name, response.id, response.email, response.internSchool, response.role);
            team.push(newMember);
        })
        .then(() => {
            addTeamMember();
        });
}

//============================== Add team members
function addTeamMember() {
    inquirer
        .prompt(actionQuestion)
        .then((response) => {
            let memberRole = response.addEmployee;
            if (memberRole === "Manager") {
                promptManager();
            }
            else if (memberRole === "Engineer") {
                promptEngineer();
            }
            else if (memberRole === "Intern") {
                promptIntern();
            }
            else if (memberRole === "Finish constructing webpage.") {
                finalize();
            }
        });
}


//=================================== Create All Cards
function createAllCards() {
    for (i = 0; i < team.length; i++) {
        if (team[i].role === "Manager") {
            var newMember = [team[i].name, team[i].id, team[i].email, team[i].managerOffice, team[i].role];
            let addCard = makeManager(newMember);
            fs.appendFile("./dist/teamPage.html", addCard, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        if (team[i].role === "Engineer") {
            var newMember = [team[i].name, team[i].id, team[i].email, team[i].engineerGit, team[i].role];
            let addCard = makeEngineer(newMember);
            fs.appendFile("./dist/teamPage.html", addCard, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        if (team[i].role === "Intern") {
            var newMember = [team[i].name, team[i].id, team[i].email, team[i].internSchool, team[i].role];
            let addCard = makeIntern(newMember);
            fs.appendFile("./dist/teamPage.html", addCard, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    }
}


//==================================== Create HTML cards and tail
function finalize() {
    function renderCards() {
        return new Promise(resolve => {
            setTimeout(() => {
            resolve(createAllCards());
            }, 1500);
        });
    }
    
    async function renderTail() {
       await renderCards(); 
        fs.appendFile("./dist/teamPage.html", makePageTail(), (err) => {
            err ? console.error(err) : console.log("Success. Please check your local files for the newly created webpage. :)");
        })
    }
    renderTail();
}

//============================================= Initialization and page write
function writeFile(fileName, data,) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

function initialize() {
    writeFile("./dist/teamPage.html", makePageHead());
    writeFile("./dist/teamPageCss.css", makeCss());
    addTeamMember();
}
initialize();