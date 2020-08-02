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
     