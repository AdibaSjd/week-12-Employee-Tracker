INSERT INTO department (id, name) VALUES (1, "Sales")
INSERT INTO department (id, name) VALUES (2, "Engineering")
INSERT INTO department (id, name) VALUES (3, "Finance")
INSERT INTO department (id, name) VALUES (4, "Legal")

INSERT INTO ROLE (id, title, salary, department_id) VALUES (1. 'Sales Lead', 30000, 1);
INSERT INTO ROLE (id, title, salary, department_id) VALUES (1. 'Engineer Lead', 50000, 2);
INSERT INTO ROLE (id, title, salary, department_id) VALUES (1. 'sales representative', 25000, 1);
INSERT INTO ROLE (id, title, salary, department_id) VALUES (1. 'Lawyer', 40000, 4);
INSERT INTO ROLE (id, title, salary, department_id) VALUES (1. 'Chartered Accountant', 60000, 3);
INSERT INTO ROLE (id, title, salary, department_id) VALUES (1. 'Software Engineer', 70000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Bethany", "lennard", 1, NULL),
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, "Modou", "Sire", 1, NULL),
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Tiffany", "Walker", 2,1),
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Mark", "Jacobs", 3,2 NULL),
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Tracy", "Beacker", 1,4, NULL),
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Casey", "Copper", 2,8, NULL),