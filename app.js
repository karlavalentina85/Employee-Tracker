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
   