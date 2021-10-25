const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db"
});


const { resolve } = require("path");


const departmentList = [];
const managerList = [];
const roleList = [];

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
        type: "number", // Int?
        name: "roleSalary",
        message: "What is the base salary for this new role?", //
        validate: isNumber()
    }
    ,
    {
        type: "list", // How to get chose? may need to separate
        name: "roleDepartment",
        message: "What department is this new role under?",
        choices: [...departmentList]
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
        type: "list", // Unsure what this one means
        name: "employeeRole",
        message: "What is this employee's role?",
        choices: [...roleList]
    }
    ,
    {
        type: "list", // How to get chose? may need to separate
        name: "employeeManager",
        message: "Who is this employee's manager, if any?",
        choices: [...managerList, "None"]
    }
];

//============================== Validations
function isNumber(input) {
    if (typeof(input) !== 'number') {
        return "Salary must be a number!";
    }
    return true;
}








//=========================== View Tables

function viewDepartments() {
    db.query(`SELECT * FROM department_t;`);




};

function viewRoles() {
    db.query(`SELECT * FROM role_t;`);
};

function viewEmployees() {
    db.query(`SELECT * FROM employees_t;`);
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
            console.log("Successfully added.");
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
            console.log("Successfully added.");
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
            console.log("Successfully added.");
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
            console.log("Successfully updated.");
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

//========================== Initialization function 
function populateLists() {


}


function initialize() {
    populateLists();
    chooseAction();
}
initialize();