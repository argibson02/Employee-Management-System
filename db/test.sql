-- INSERT INTO department_t(department_name)
-- VALUES  ("Engineering"),
--         ("Finance"),
--         ("Legal"),
--         ("Sales"),
--         ("Human Resources");


-- INSERT INTO role_t(title, salary, department_id)
-- VALUES  ("Lead Engineer", 175000, 1),
--         ("Software Engineer", 125000, 1),
--         ("Account Manager", 160000, 2),
--         ("Accountant", 111000, 2),
--         ("Legal Team Lead", 250000, 3),
--         ("Lawyer", 190000, 3),
--         ("Sales Lead", 140000, 4),
--         ("Salesperson", 80000, 4),
--         ("HR Manager", 90000, 5),
--         ("HR Associate", 65000, 5);


-- INSERT INTO employee_t(first_name, last_name, role_id, manager_id)
-- VALUES  ("Zinedine", "McCormick", 1, null),
--         ("Reagan", "Schultes", 2, 1),
--         ("Hagop", "Planck", 2, 1),
--         ("Pisti", "Skalicky", 3, null),
--         ("Agnes", "Joossens", 4, 4),
--         ("Ekber", "Bambach", 4, 4),
--         ("Jocjo", "Vega", 5, null),
--         ("Beatrix", "Schulze", 6, 7),
--         ("Cathan", "Gwozdek", 6, 7),
--         ("Tim", "Dean", 7, null),
--         ("Colombano", "Lawrence", 8, 10),
--         ("Birgit", "Obando", 8, 10),
--         ("Kanti", "Alvarsson", 9, null),
--         ("Lusineh", "Gosse", 10, 13),
--         ("Daenerys", "Rapp", 10, 13),
--         ("Kaitlyn", "Cardozo", 1, null),
--         ("Aroa", "McSheehy", 2, 1),
--         ("Sarita", "Hayley", 2, 16),
--         ("Bertil", "Rybar", 3, null),
--         ("Llinos", "Cary", 4, 19),
--         ("Barukh", "Desmond", 4, 19),
--         ("Monika", "Herman", 5, null),
--         ("Delia", "Samuelson", 6, 22),
--         ("Ludvik", "Jansson", 6, 7),
--         ("Mirac", "Dixon", 7, null),
--         ("Suibne", "Laukkanen", 8, 25),
--         ("Feofil", "Eads", 8, 25),
--         ("Caelan", "Arrighetti", 9, null),
--         ("Samira", "Bentsen", 10, 28),
--         ("Rhea", "Sitko", 10, 13);


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


SELECT * FROM employee_t;
SELECT * FROM employee_t JOIN role_t ON employee_t.role_id = role_t.id ;
SELECT * FROM employee_t JOIN role_t_id, role_t.title, role_t.salary ON employee_t.role_id = role_t.id;

SELECT employee_t.*, role_t.title, role_t.salary FROM employee_t JOIN role_t ON employee_t.role_id = role_t.id;

SELECT employee_t.first_name, employee_t.last_name, employee_t.manager_id, role_t.title, role_t.salary, department_name
FROM employee_t 
    INNER JOIN role_t ON employee_t.role_id = role_t.id 
    INNER JOIN department_t ON role_t.department_id = department_t.id;


-- get depts
SELECT department_name FROM department_t;

--get  roles
SELECT role_t.title FROM role_t;

-- get managers
SELECT employee_t.id, employee_t.first_name, employee_t.last_name, employee_t.role_id, role_t.title
FROM employee_t 
    INNER JOIN role_t ON employee_t.role_id = role_t.id
    WHERE manager_id IS NULL;






INSERT INTO department_t(department_name)
VALUES (${response.departmentName});

INSERT INTO role_t(title, salary, department_id)
VALUES (${response.roleName}, ${response.roleSalary}, ${response.roleDepartment});

INSERT INTO employee_t(first_name, last_name, role_id, manager_id)
VALUES (${response.employeeFirstName}, ${response.employeeLastName}, ${response.employeeRole}, ${response.employeeManager});