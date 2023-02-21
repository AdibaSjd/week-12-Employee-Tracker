const inquirer = require("inquirer")
const db = require("./db")
const { MainMenuQuestions, DepartmentQuestions, RoleQuestions, EmployeeQuestions, UpdateEmployeeRoleQuestions } = require("./questions");

function viewAllRoles() {
    db.promise().query("SELECT * FROM roles INNER JOIN departments ON roles.department_id = departments.id")
        .then(function (roleData) {
            const results = roleData[0];
            console.table(results)
        }).then(() => {
            MainMenu();
        });
}

function viewAllEmployees() {
    db.promise().query("SELECT employees.first_name, employees.last_name, roles.title from employees INNER JOIN roles ON employees.role_id = roles.id")
        .then(function (employeeData) {
            const results = employeeData[0];
            console.table(results);
        }).then(() => {
            MainMenu();
        });
}


//add newdepartment questions and call back to main questions
function viewAllDepartments() {

    db.promise().query("SELECT * from departments")
        .then(function (departmentData) {

            const results = departmentData[0];
            console.table(results)
        }).then(() => {
            MainMenu();
        });
};

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

                console.log(departments);

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
// ** Adiba: Finish this this function
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

                console.log(roles);

                // add the departments to the new Role questions
                EmployeeQuestions[2].choices = roles;
            }

            // RoleQuestions
            inquirer
                .prompt(EmployeeQuestions)
                .then((response) => {

                    // Build up the final data that we're going to insert into the database
                    const employeData = {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: response.role_id
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
};

// **********************************************************************
// ** 
// ** Adiba: Finish this this function
// ** 
// **********************************************************************
function UpdateRole() {
    db.getEmployee().then((results) => {

        const EmployeeQuestions = UpdateEmployeeRoleQuestions[0];
        results.forEach((employee) => {
            EmployeeQuestions.choices.push({
                value: employee.id,
                value: employee.title
            });
        });

        db.getRoles().then((results) => {

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
                    db.updateEmployeeRole(response).then((results) => {
                        console.log('\n', results, '\n');

                    });
                });
        });

    });
}


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