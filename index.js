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

//
function addDepartments()
{
    inquirer
    .prompt(NewDepartment)
    .then ((response)=> {
        db.addDepartment(response).then((results) => {
        console.log('\n', results, '\n');
        })

    });
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


//add newdepartmenst questions and call back to main questions
function viewAllDepartments() {
        db.promise().query("SELECT * from add deperatments")
    db.getDepartments().then((results) => {
        const NewDepartment = AddRoleQuestions[2];
        results.forEach((department) => {
            NewDepartment.choices.push({
                value:department.id,
                name:department.name
            });
        })
    });
    }
    

function addRoles(){

    inquirer
    .prompt(UpdateEmployeeRoleQuestions)
    .then((response) => {
        db.addRoles(response).then((results) => {
            console.log ('\n', results, '\n');
            MainMenuQuestions();
        });
    })
}



function addEmployees(){
    inquirer
    .prompt(EmployeeQuestions)
    .then((response) => {
        db.addEmployees(response).then((results) => {
            console.log ('\n', results, '\n');
            MainMenuQuestions();
        });
    })
}

function UpdateRole(){
    
    inquirer
    .prompt(UpdateEmployeeRoleQuestions)
    .then((response) => {
        db.addRoles(response).then((results) => {
            console.log ('\n', results, '\n');
            MainMenuQuestions();
        });
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

