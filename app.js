//Call packages needed to make this work
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

//MySQL connection parameters
var conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "cms"
});

//Connection to database
conn.connect(function (err) {
  if (err) throw err;
});

function showApHeader () {
  console.log(
    chalk.yellow(
      figlet.textSync('EmpTrac 1.0', { horizontalLayout: 'full' })
    )
  );  
}

function clearConsoleAndScrollbackBuffer() {
  process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");console.clear();
}

//Main function that collects inputs from user and shows them the menu and data
function beginSearch() {

  //Generates main menu
  inquirer
  .prompt({
      type: "rawlist",
      name: "optionList",
      message: "Please select an option: ",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee's role",
        "Exit Application"
      ]
    })
    .then(function(response) {
      switch(response.optionList){
      case "View all employees":
        //calls function that shows all employees
        viewAllEmployees();
        break;
      
      case "View all departments":
        //calls function that shows all departments
        viewAllDepartments();
        break;

      case "View all roles":
        //calls function that shows all roles
        viewAllRoles();
        break;

      case "Add department":
        //calls function that shows all departments
        addDepartment();
        break;
      
      case "Add employee":
        //calls function to add a new employee
        addEmployee();
        break;

      case "Add role":
        //calls function to add a new role
        addRole();
        break;

      case "Update employee's role":
        //calls function to update an existing employee's role
        updateRole();
        break;

      //closes the application
      case "Exit Application":
        console.log("Thank you.  Please come again.");
        process.exit(1);        
      }

    });
}

function viewAllEmployees(){
  var query = "SELECT * FROM employee";

  conn.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    beginSearch();
  })
}

function viewAllDepartments(){
  var query = "SELECT * FROM department";
  conn.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    beginSearch();
  })
}

function viewAllRoles(){
  var query = "SELECT * FROM roles";
  conn.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    beginSearch();
  })
}

function addDepartment(){
  var query = "INSERT INTO department (name) VALUES (?)"

  inquirer
    .prompt([{
      name: "department",
      type: "input",
      message: "What is the new department name?"
    }]).then(function(res){
      const departName = [res.department]

      conn.query(query, departName, function(err,qres){
        if (err) throw err;
        console.log("Department has been created.");
        beginSearch();
      })
    })
}

function addEmployee(){
  var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)"

  inquirer
  .prompt([{
    name: "firstName",
    type: "input",
    message: "What is the employee's first name?"
  },
  {
    name: "lastName",
    type: "input",
    message: "What is the employee's last name?"
  },
  {
    name: "role",
    type: "input",
    message:"What is the role ID?"
  },
  {
    name: "manager",
    type: "input",
    message:"What is the manager ID?"
  }])
  .then(function(res){
    var employee = [res.firstName, res.lastName, res.role, res.manager];

    conn.query(query, employee, function(err, qres){
      if (err) throw err;
      console.log("Added new employee");
      beginSearch();
      })
  })
}

function addRole(){
  var query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)"
  inquirer
  .prompt([
  {
    name: "title",
    type: "input",
    message: "What is the new role?"
  },
  {
    name: "salary",
    type: "input",
    message: "What is the new salary for that role?"
  },
  {
    name: "departID",
    type: "input",
    message:"What is the department ID for the new role?"
  }])
  .then(function(res){
    var role = [res.title, res.salary, res.departID];

    conn.query(query, role, function(err, qres){
      if (err) throw err;
      console.log("Added new role");
      beginSearch();
      })
  })
}

function updateRole(){

  inquirer
  .prompt([{
      name: "employee",
      type: "input",
      message:"What is the employee's ID?"
    },
    {
      name: "role",
      type: "input",
      message:"What is the employee's new role ID?"
    }])
    .then(function(res){
      var sql = "UPDATE employee SET role_id = " + res.role + " WHERE id = " + res.employee;
      conn.query(sql, function (err, qres) {
        if (err) throw err;
        console.log("Employee role updated successfully.")
        beginSearch();
      });
    });
}

clearConsoleAndScrollbackBuffer();
showApHeader();
beginSearch();