DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employees_DB;

--dept table
CREATE TABLE department(
    id int NOT NULL AUTO_INCREMENT
    name VARCHAR(30) NULL
    PRIMARY KEY(id)
);


--roles table
CREATE TABLE roles (
    id int NOT NULL AUTO_INCREMENT
    title VARCHAR (30),
    salary DECIMAL (12,2),
    department_id INT
);

CREATE TABLE employee (
    employeeId int NOT NULL AUTO_INCREMENT
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
