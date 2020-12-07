var mysql = require("mysql");
var inquirer = require("inquirer");
// var console.table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your usernameclear
  user: "root",

  // Your password
  password: "Vicfirth30!",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
        "View all Employees By Department",
        "View all Employees By Manager",
        "Remove Employees",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all Employees":
        viewAllEmployees();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "View Departments":
        viewDepartments();
        break;

        case "View Roles":
        viewRoll();
        break;

        case "View Employees":
        viewEmployees();
        break;

        case "Update Employee Role":
        updateRoll();
        break;

        case "View all Employees By Department":
        viewEmployeesByDept();
        break;

        case "View all Employees By Manager":
        viewEmployeeByMan();
        break;

        case "Remove Employee":
          removeEmployee();
          break;
      }
    });
}

function viewAllEmployees() {
      var query = "SELECT first_name, last_name, title, department, salary, manager FROM employee WHERE ?";
      connection.query(query, { employee: answer.employee }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Employee: " + res[i].position + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Department: " + res[i].department + " || Salary: " + res[i].salary + " || Manager: " + res[i].manager);
        }
        runSearch();
      });
};
//
const readColleges() {
  connection.query("SELECT name FROM colleges", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}
//


const employeeSearch() {
  inquirer
    .prompt({
      name: "first_name" + "last_name",
      type: "input",
      message: "What Employee would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT first_name, last_name, title, department, salary, manager FROM employee WHERE ?";
      connection.query(query, { first_name: answer.first_name }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Employee: " + res[i].position + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Department: " + res[i].department + " || Salary: " + res[i].salary + " || Manager: " + res[i].manager);
        }
        runSearch();
      });
    });

}
const addDept = () => {
    inquirer
      .prompt({
        name: 'deptName',
        type: 'input',
        message: 'What department would you like to add?',
      })
      .then((answer) => {
        connection.query(
          "INSERT INTO department SET ?", {name: answer.deptName,},
          function(err, res) {
            if (err) throw err;
            console.log(`successfully added ${answer.deptName} to database`);
            runSearch();
          });
      });
  };
  
  const addRole = () => {
    inquirer
      .prompt([{
        name: 'title',
        type: 'input',
        message: 'What role would you like to add?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?'
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'What is the department ID for this role?'
      }])
      .then((answer) => {
        const query = "INSERT INTO role SET?"
        connection.query(
          query, {title: answer.title, salary: answer.salary, department_id: answer.department_id}, function(err, res) {
            if (err) throw err;
            console.log(`successfully added ${answer.title} to database`);
            runSearch();
          });
      });  
  };
  
  const addEmployee = () => {
    inquirer
      .prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the first name?'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name?'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'What is the ID for their role?'
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'What is the manager ID for this employee?'
      }])
      .then((answer) => {
        const query = "INSERT INTO employee SET?"
        connection.query(
          query, {first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role_id, manager_id: answer.manager_id}, function(err, res) {
            if (err) throw err;
            console.log(`successfully added ${answer.first_name} to database`);
            runSearch();
          });
      });  
  };
  
  const viewDepts = () => {
    const query =
    'SELECT * FROM department';
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
    });
  };
  
  const viewRoles = () => {
    const query =
    'SELECT * FROM role';
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
    });
  };
  
  const viewAllEmployees = () => {
    const query = "SELECT e.id, e.first_name, e.last_name, e.manager_id, r.title, r.salary, d.name FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id";
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
    });
  };
  
  const updateEmployee = () => {
    inquirer
      .prompt([{
        name: 'emp_id',
        type: 'input',
        message: 'What is the employee ID of the person whose role would you like to update?'
      },
      {
        name: 'new_role',
        type: 'list',
        message: 'What is their new role?',
        choices: [
          'Junior Developer',
          'Developer',
          'Senior Developer',
          'CEO',
          'Vice President',
          'Intern'
        ]
      }])
      .then((answer) => {
        if (answer.new_role === "Junior Developer") {
          const query = `UPDATE employee SET role_id = 1 WHERE id = ${answer.emp_id}`;
          connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(`successfully updated the role for employee # ${answer.emp_id}`);
            runSearch();
          });
        } else if (answer.new_role === "Developer") {
          const query = `UPDATE employee SET role_id = 2 WHERE id = ${answer.emp_id}`;
          connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(`successfully updated the role for employee # ${answer.emp_id}`);
            runSearch();
          });
        } else if (answer.new_role === "Senior Developer") {
          const query = `UPDATE employee SET role_id = 3 WHERE id = ${answer.emp_id}`;
          connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(`successfully updated the role for employee # ${answer.emp_id}`);
            runSearch();
          });
        } else if (answer.new_role === "CEO") {
          const query = `UPDATE employee SET role_id = 4 WHERE id = ${answer.emp_id}`;
          connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(`successfully updated the role for employee # ${answer.emp_id}`);
            runSearch();
          });
        } else if (answer.new_role === "Vice President") {
          const query = `UPDATE employee SET role_id = 5 WHERE id = ${answer.emp_id}`;
          connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(`successfully updated the role for employee # ${answer.emp_id}`);
            runSearch();
          });
        } else if (answer.new_role === "Intern") {
          const query = `UPDATE employee SET role_id = 6 WHERE id = ${answer.emp_id}`;
          connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(`successfully updated the role for employee # ${answer.emp_id}`);
            runSearch();
          });
        }
  
      });  
  };
  
  const deleteEmployee = () => {
    inquirercd.
      .prompt([{
        name: 'emp_id',
        type: 'input',
        message: 'What is the employee ID of the employee you would like to delete?'
      }])
      .then((answer) => {
        const query = `DELETE FROM employee WHERE id = ${answer.emp_id}`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.log(`successfully deleted employee # ${answer.emp_id}`);
          runSearch();
      })
    });  
  };

  module.exports = { addData }