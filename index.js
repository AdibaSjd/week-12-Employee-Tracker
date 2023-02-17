const inquirer = require("inquirer")
const db = require("./db")
const { MainMenuQuestions, DepartmentQuestions, RoleQuestions, EmployeeQuestions, UpdateEmployeeRoleQuestions } = require("./questions");

function viewAllRoles() {
    db.promise().query("SELECT * from roles ")
        .then(function (roleData) {
            const results = roleData[0];
            console.table(results)
        }).then(() => {
            MainMenu();
        });
}

function viewAllEmployees() {
    db.promise().query("SELECT * from employees")
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

    db.query(`SELECT * roles.title, roles.salary, departments.name as department from roles INNER JOIN departments ON roles.department_id = departments.id`, 
    (err, results) => {
        if (err) {
            console.warn(err);
        } else {

            const roles = results.map((role) => {
                return {
                    name: role.name,
                    value: role.id
                }
            });

            // add the departments to the new Role questions
            EmployeeQuestions[2].choices = departments;
        }

 // RoleQuestions
        inquirer
            .prompt(RoleQuestions)
            .then((response) => {

                // Build up the final data that we're going to insert into the database
                const roleData = {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: response.role_id
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
function addEmployees() {

    inquirer
        .prompt(EmployeeQuestions)
        .then((response) => {

            const employeeData = {
                name: response.name
            };

            db.query('INSERT INTO employee SET ?', employeeData, (err, results) => {
                if (err) {
                    console.warn(err);
                } else {
                    console.log(`Employee ${employeeData.name} added!`);
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
        .prompt (UpdateEmployeeRoleQuestions)
        .then((response) => {
            db.updateEmployeeRole(response).then((results) => {
                console.log ('\n',results, '\n');
                
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
                addEmployees()
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