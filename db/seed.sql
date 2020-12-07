USE employee_DB;
INSERT INTO departments (name)
VALUES ("Marketing");
INSERT INTO departments (name)
VALUES ("Tech Support");
INSERT INTO roles (title, salary, dept_id)
VALUES ("Creative Director", 100000, 1);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Software Engineer", 70000, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Susan", "Boyle", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Smith", 2, null);






















