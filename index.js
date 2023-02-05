const inquirer = require ("inquirer")
const db = require ("./db")
require("console.table")

const MainMenuQuestions = [
    {
        type: "list",
        name: "option",
        message: "what would you like to do?",
choices: [
    {value: 'departments', name: "view differnt depeartments"},
    {value: "roles", name: "view all roles"},
    {value: "employees", name: "view all employees"},
    {value: "add_departments", name:"add deperatments"},
    {value: "add_role", name:"add role"},
    {value: "add_employee", name:"add employee"},
    {value: "update_role", name: "update employee role"}
]
    },
]

const NewDepartment = [
    {
        type: "input",
        name: "name_department",
        message: "Enter the name of your new department"
    },
     {
        type: "number", 
        name: "Salary", 
        message: "Enter your new roles Salary (Numbers Only)",
     },
]

const  EmployeeQuestions = [
    {
        type: "input",
        name: "first_name",
        message: "Enter employees first name..."
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter employees last name..."
    },
    {
        type: "list",
        name: "role_id",
        message: "Select employee roles...",
        choices:[
        ]
    },
    {
      type: "list",
      name: "manager_id",
      message: "Select the employee/'s manager...",
      choices:[
      ]
    },
]


const UpdateEmployeeRoleQuestions = [
    {
        type: "list",
        name: "employee_ID",
        message: "select the employee/'s new Role ...",
        choices: [
        ],
    },
]

function viewAllDepartments(){
    db.promise().query("SELECT * from departments ")
    .then(function(departmentData){
        console.log(departmentData);
        console.table(departmentData[0])
    })
    //Use the database to retrieve data
}

function viewAllRoles(){
    db.promise().query("SELECT * from roles ")
    .then(function(roleData){
        console.log(roleData);
        console.table(roleData[0])
    })
    //Use the database to retrieve data
}

function viewAllEmployees(){
    db.promise().query("SELECT * from employees ")
    .then(function(employeeData){
        console.log(employeeData);
        console.table(employeeData[0])
    })
    //Use the database to retrieve data
}

function addDepartments(){
    db.promise().query("SELECT * from add_departments")
    .then(function(addedDepartmentsData){
        console.log(addedDepartmentsData);
        console.table(addedDepartmentsData[0])
    })
    //Use the database to retrieve data
}

function addRoles(){
    db.promise().query("SELECT * from add_roles")
    .then(function(addedRolesData){
        console.log(addedRolesData);
        console.table(addedRolesData[0])
    })
    //Use the database to retrieve data
}

function addEmployees(){
    db.promise().query("SELECT * from add_employees")
    .then(function(addedEmployeesData){
        console.log(addedEmployeesData);
        console.table(addedEmployeesData[0])
    })
    //Use the database to retrieve data
}

function UpdateRole(){
    db.promise().query("SELECT * from update_role")
    .then(function(UpdatedRoleData){
        console.log(UpdatedRoleData);
        console.table(UpdatedRoleData[0])
    })
    //Use the database to retrieve data
}

function init() { 
    inquirer.prompt(MainMenuQuestions).then(answer => {
        console.log(answer)
        
        switch(answer.option){
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
                    addDepartments()
                    break;

                case "add_role":
                    addRoles()
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
// Function call to initialize app
init();

