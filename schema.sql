DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

DROP TABLE IF EXISTS department_t;
CREATE TABLE department_t(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL

);

DROP TABLE IF EXISTS role_t;
CREATE TABLE role_t(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department_t(id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee_t;
CREATE TABLE employee_t(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT, 
    FOREIGN KEY (manager_id)
    REFERENCES employee_t(id)
    ON DELETE SET NULL
);


-- DROP TABLE IF EXISTS ;
-- CREATE TABLE (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
-- );

-- DROP TABLE IF EXISTS ;
-- CREATE TABLE (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
-- );

-- DROP TABLE IF EXISTS ;
-- CREATE TABLE (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
-- );
