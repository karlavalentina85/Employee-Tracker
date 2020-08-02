INSERT INTO department (dept) VALUES
("Accounting"),
("Finance"),
("Sales"),
("IT"),
("Executive");

SELECT * FROM department;

INSERT INTO roles (title, salary, department_id) VALUES
("Accountant", 85000, 1),
("CFO", 145000, 1),
("Lead Analyst", 55000, 2),
("Financial Planner", 45000, 2),
("Retail Clerk", 25000, 3),
("Online Sales Associate", 27500, 3),
("Jr Programmer", 75000, 4),
("Sr Programmer", 85000, 4),
("CEO", 233500, 5),
("COO", 145000, 5),

SELECT * FROM roles;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Allan", "Burns", 1, 1),
("Chris", "Dodd", 2, 1),
("Eric", "Frist", 3, 1),
("Greg", "Hall", 4, 3),
("Ingrid", "Jones", 5, 3),
("Kat", "Lion", 6, 3),
("Mike", "Nunn", 7, 4),
("Oliver", "Prince", 8, 4),
("Quin", "Ralf", 9, 8),
("Steve", "Turns", 10, 8),

SELECT * FROM employee;