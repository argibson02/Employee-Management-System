const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const mysql = require('mysql2');

const { resolve } = require("path");


const team = [];

const actionQuestion = [
    // What would you like to
    {
        type: "list",
        name: "action",
        message: "What would you like to do?", //
        choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add role", "Add employee", "Update employee role"]
    }
];

const addDepartmentQuestions = [
    // Department prompts
    {
        type: "input",
        name: "departmentName",
        message: "What is the name of this new department?" //
    }
];

const addRoleQuestions = [
    // Role prompts
    {
        type: "input",
        name: "roleName",
        message: "What is the name of this new role?" //
    }
    ,
    {
        type: "input", // Int?
        name: "roleSalary",
        message: "What is the base salary for this new role?" //
    }
    ,
    {
        type: "", // How to get chose? may need to separate
        name: "roleDepartment",
        message: "What department is this new role under?" //
    }
];

const addEmployeeQuestions = [
    // Employee prompts
    {
        type: "input",
        name: "employeeFirstName",
        message: "What is the first name of this employee?" //
    }
    ,
    {
        type: "input",
        name: "employeeLastName",
        message: "What is the first name of this employee?" //
    }
    ,
    {
        type: "", // Unsure what this one means
        name: "employeeRole",
        message: "What is this employee's role?" //
    }
    ,
    {
        type: "", // How to get chose? may need to separate
        name: "employeeManager",
        message: "Who is this employee's manager, if any?" //
    }
];


//=========================== View Directories

function viewDepartments() {

};

function viewRoles() {

};

function viewEmployees() {

};




//============================ Editing Prompts
function promptDepartment() {
    inquirer
        .prompt(addDepartmentQuestions)
        .then((response) => {
            // let role = { role: "Manager" };
            // response = { ...response, ...role };
            // var newMember = new Manager(response.name, response.id, response.email, response.managerOffice, response.role);
            // team.push(newMember);
        })
        .then(() => {
            chooseAction();
        });
}

function promptRole() {
    inquirer
        .prompt(addRoleQuestions)
        .then((response) => {
            // let role = { role: "Engineer" };
            // response = { ...response, ...role };
            // var newMember = new Engineer(response.name, response.id, response.email, response.engineerGit, response.role);
            // team.push(newMember);
        })
        .then(() => {
            chooseAction();
        });
}

function promptAddEmployee() {
    inquirer
        .prompt(addEmployeeQuestions)
        .then((response) => {
            // let role = { role: "Intern" };
            // response = { ...response, ...role };
            // var newMember = new Intern(response.name, response.id, response.email, response.internSchool, response.role);
            // team.push(newMember);
        })
        .then(() => {
            chooseAction();
        });

}

function promptUpdateEmployee() {
    inquirer
        .prompt(addEmployeeQuestions)
        .then((response) => {
            // let role = { role: "Intern" };
            // response = { ...response, ...role };
            // var newMember = new Intern(response.name, response.id, response.email, response.internSchool, response.role);
            // team.push(newMember);
        })
        .then(() => {
            chooseAction();
        });
}


//============================== Action selection
function chooseAction() {
    inquirer
        .prompt(actionQuestion)
        .then((response) => {
            let actionSelected = response.action;
            if (actionSelected === "View all departments") {
                viewDepartments();
            }
            else if (actionSelected === "View all roles") {
                viewRoles();
            }
            else if (actionSelected === "View all employees") {
                viewEmployees();
            }
            else if (actionSelected === "Add department") {
                promptDepartment();
            }
            else if (actionSelected === "Add role") {
                promptRole();
            }
            else if (actionSelected === "Add employee") {
                promptAddEmployee();
            }
            else if (actionSelected === "Update employee role") {
                promptUpdateEmployee();
            }
        });
}


function initialize() {
    chooseAction();
}
initialize();