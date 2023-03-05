const inquirer = require("inquirer")
const db = require("./db")
const { MainMenuQuestions, DepartmentQuestions, RoleQuestions, EmployeeQuestions, UpdateEmployeeRoleQuestions } = require("./questions");

// **********************************************************************
// ** 
// ** View a list of all Roles with their salaries and departments
// ** 
// **********************************************************************
function viewAllRoles() {
    db.promise().query("SELECT * FROM roles INNER JOIN departments ON roles.department_id = departments.id")
        .then(function (roleData) {
            const results = roleData[0];
            console.table(results)
        }).then(() => {
            MainMenu();
        });
}

// **********************************************************************
// ** 
// ** View a list of all Employees with their roles and managers
// ** 
// **********************************************************************


// function viewAllEmployees() {
//     db.promise().query("SELECT employees.first_name, employees.last_name, roles.title, CONCAT(manager.first_name, ' ', manager.last_name) as manager from employees INNER JOIN roles ON employees.role_id = roles.id LEFT JOIN employees manager ON employees.manager_id = manager.id")
//         .then(function (employeeData) {
//             const results = employeeData[0];
//             console.table(results);
//         }).then(() => {
//             MainMenu();
//         });
// }

function viewAllEmployees() {
    db.promise().query(`SELECT
    employees.id,
    CONCAT (employees.first_name, ' ', employees.last_name) AS staff_name,
    roles.title AS job_title,
    roles.salary AS salary,
    departments.name AS departments_name,
    IF(CONCAT(manager.first_name, ' ', manager.last_name) IS NULL, '', CONCAT(manager.first_name, ' ', manager.last_name)) AS manager_name

    FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id`)

        .then(function (employeeData) {
            const results = employeeData[0];
            console.table(results);
        }).then(() => {
            MainMenu();
        });
}


// **********************************************************************
// ** 
// ** View a list of all departments
// ** 
// **********************************************************************
function viewAllDepartments() {

    db.promise().query("SELECT * from departments")
        .then(function (departmentData) {

            const results = departmentData[0];
            console.table(results)
        }).then(() => {
            MainMenu();
        });
};

// **********************************************************************
// ** 
// ** Add a new Role
// ** 
// **********************************************************************
function addRole() {

    db.query(`SELECT departments.id, departments.name FROM departments`,
        (err, results) => {
            if (err) {
                console.warn(err);
            } else {

                const departments = results.map((department) => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                });

                //console.log(departments);

                // add the departments to the new Role questions
                RoleQuestions[2].choices = departments;
            }

            // RoleQuestions
            inquirer
                .prompt(RoleQuestions)
                .then((response) => {

                    // Build up the final data that we're going to insert into the database
                    const roleData = {
                        title: response.title,
                        salary: response.salary,
                        department_id: response.department_id
                    };

                    db.query('INSERT INTO roles SET ?', roleData, (err, results) => {
                        if (err) {
                            console.warn(err);
                        } else {
                            console.log(`Role ${roleData.name} added!`);
                            MainMenu();
                        }
                    });
                });
        });
};

// **********************************************************************
// ** 
// ** Add a new Department
// ** 
// **********************************************************************
function addDepartment() {

    inquirer
        .prompt(DepartmentQuestions)
        .then((response) => {

            const departmentData = {
                name: response.name
            };

            db.query('INSERT INTO departments SET ?', departmentData, (err, results) => {
                if (err) {
                    console.warn(err);
                } else {
                    console.log(`Department ${departmentData.name} added!`);
                    MainMenu();
                }
            });
        });
}


// **********************************************************************
// ** 
// ** Add a new Employee
// ** 
// **********************************************************************
function addEmployee() {

    db.query(`SELECT roles.id, roles.title FROM roles`,
        (err, results) => {
            if (err) {
                console.warn(err);
            } else {

                const roles = results.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                });

                //console.log(roles);

                // add the departments to the new Role questions
                EmployeeQuestions[2].choices = roles;
            }

            db.query(`SELECT employees.id, employees.first_name, employees.last_name from employees`,
                (err, results) => {
                    if (err) {
                        console.warn(err);
                    } else {

                        const managers = results.map((manager) => {
                            return {
                                name: manager.first_name + " " + manager.last_name,
                                value: manager.id
                            }
                        });

                        //console.log(managers);

                        // add the departments to the new Role questions
                        EmployeeQuestions[3].choices = managers;
                    }

                    // RoleQuestions
                    inquirer
                        .prompt(EmployeeQuestions)
                        .then((response) => {

                            // Build up the final data that we're going to insert into the database
                            const employeData = {
                                first_name: response.first_name,
                                last_name: response.last_name,
                                role_id: response.role_id,
                                manager_id: response.manager_id
                            };

                            db.query('INSERT INTO employees SET ?', employeData, (err, results) => {
                                if (err) {
                                    console.warn(err);
                                } else {
                                    console.log(`Employee ${employeData.first_name} ${employeData.last_name} added!`);
                                    MainMenu();
                                }
                            });
                        });
                });

        })
};


// **********************************************************************
// ** 
// ** Update an employee's role
// ** 
// **********************************************************************
function UpdateRole() {

    db.query(`SELECT employees.id, employees.first_name, employees.last_name from employees`,
        (err, results) => {

            const EmployeeQuestions = UpdateEmployeeRoleQuestions[0];
            results.forEach((employee) => {
                EmployeeQuestions.choices.push({
                    value: employee.id,
                    name: employee.first_name + " " + employee.last_name
                });
            });

            db.query(`SELECT roles.id, roles.title from roles`,
                (err, results) => {

                    const RoleQuestions = UpdateEmployeeRoleQuestions[1];
                    results.forEach((role) => {
                        RoleQuestions.choices.push({
                            value: role.id,
                            name: role.title
                        });
                    });

                    inquirer
                        .prompt(UpdateEmployeeRoleQuestions)
                        .then((response) => {

                            db.query('UPDATE employees SET role_id = ? WHERE id = ?', [response.role_id, response.employee_id], (err, results) => {
                                if (err) {
                                    console.warn(err);
                                } else {
                                    console.log(`Employee updated successfully!`);
                                    MainMenu();
                                }
                            });
                        });
                });
        });
}

// **********************************************************************
// ** 
// ** Main Menu options
// ** 
// **********************************************************************
function MainMenu() {
    inquirer.prompt(MainMenuQuestions).then(answer => {
        console.log(answer)

        switch (answer.option) {
            case "departments":
                viewAllDepartments()
                break;

            case "roles":
                viewAllRoles()
                break;

            case "employees":
                viewAllEmployees()
                break;

            case "add_departments":
                addDepartment()
                break;

            case "add_role":
                addRole()
                break;

            case "add_employee":
                addEmployee()
                break;

            case "update_role":
                UpdateRole()
                break;
        }
    })
}

function init() {
    MainMenu();
}

// Function call to initialize app
init();