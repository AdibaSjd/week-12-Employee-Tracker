INSERT INTO departments (name) VALUES ("Sales");
INSERT INTO departments (name) VALUES ("Engineering");
INSERT INTO departments (name) VALUES ("Finance");
INSERT INTO departments (name) VALUES ("Legal");

INSERT INTO roles (title, salary, department_id) VALUES 
('Sales Lead', 30000, 1),
('Engineer Lead', 50000, 2),
( 'sales representative', 25000, 1),
( 'Lawyer', 40000, 4),
( 'Chartered Accountant', 60000, 3),
( 'Software Engineer', 70000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
( "Bethany", "Lennard", 1, NULL),
( "Modou", "Sire", 1, NULL),
( "Tiffany", "Walker", 2,1),
( "Mark", "Jacobs", 3, NULL),
( "Tracy", "Beacker", 1, NULL),
("Casey", "Copper", 2, NULL);