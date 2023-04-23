const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "TestS",
    database: "employeesIndex_db",
  },
  console.log(`Connected to the employeesIndex_db database.`)
);

const question = [
  {
    message: "What would you like to do?",
    name: "options",
    type: "list",
    choices: [
      "Add a role", // working
      "View all roles", //working
      "View all employees", //working
      "Add an employee", //working
      "Update Employee Role", //working
      "View all departments", //working
      "Add departmnent", // working
      "Quit", //
    ],
  },
];

returnMenu();

function returnMenu() {
  inquirer.prompt(question).then((answers) => {
    if (answers.options == "Add an employee") {
      addEmployee();
    }
    if (answers.options == "View all departments") {
      viewDepartment();
    }
    if (answers.options == "View all employees") {
      viewEmployee();
    }
    if (answers.options == "Add a role") {
      addRole()
    }
    if (answers.options == "Update Employee Role") {
    
    updateRole()
    }
    if (answers.options == "Add departmnent") {
      addDepartment()
    }
    if (answers.options == "View all roles") {
      viewRole();
    }
    if (answers.options == "Quit") {
      process.exit()
    }
  });
}

//functions
function viewRole() {
  {
    db.query("SELECT * FROM role", function (err, results) {
      console.table(results);
      returnMenu();
    });
  }
}

function viewDepartment() {
  {
    db.query("SELECT * FROM department", function (err, results) {
      console.table(results);
      returnMenu();
    });
  }
}

function viewEmployee() {
  {
    db.query("SELECT * FROM employee", function (err, results) {
      console.table(results);
      returnMenu();
    });
  }
}

function addEmployee() {
  {
    inquirer
      .prompt([
        { type: "input", message: "Employee first name", name: "first_name" },
        { type: "input", message: "Employee last name", name: "last_name" },
        { type: "input", message: "Employee role id", name: "role_id" },
        { type: "input", message: "Employee manager id", name: "manager_id" },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO employee (first_name, last_name, role_id  ,manager_id) VALUES (?, ?, ?, ?)",
          [
            answers.first_name,
            answers.last_name,
            answers.role_id,
            answers.manager_id,
          ],
          function (err, results) {
            viewEmployee();
          }
        );
      });
  }
}

function updateRole() {
  inquirer
    .prompt([
      { type: "input", message: "What's the employee id", name: "employee_id" },
      { type: "input", message: "What's the new role id", name: "role_id" },
    ])
    .then((answers) => {
      db.query(
        "UPDATE employee set role_id = ? where id=? ",
        [answers.role_id, answers.employee_id],
        function (err, results) {
          viewEmployee();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      { type: "input", message: "Whats the new title name", name: "title" },
      { type: "input", message: "Whats the new salary", name: "salary"},
      { type: "input", message: "What department id", name: "deptid"}  
    ])
    .then((answers) => {
      const deptnum = parseInt(answers.deptid)
      const salarynum = parseInt(answers.salary)
      const sql = [answers.title, salarynum, deptnum];
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", sql, function (err, results) {
          if (err) {
            console.log(results)
            console.log(err)
        }
        console.log('Role Added');
        viewRole()
        }
      );
    }
    );
}


function addDepartment() 
{
  {
    inquirer
      .prompt([
        { type: "input", message: "New department name", name: "name" },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO department (name) VALUES (?)",
          [
            answers.name,
          ],
          function (err, results) {
            viewDepartment();
          }
        );
      });
  }
};
