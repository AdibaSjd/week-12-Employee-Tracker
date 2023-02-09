const MainMenuQuestions = [
    {
        type: "list",
        name: "option",
        message: "what would you like to do?",
        choices: [
            { value: 'departments', name: "view all departments" },
            { value: "roles", name: "view all roles" },
            { value: "employees", name: "view all employees" },
            { value: "add_departments", name: "add a department" },
            { value: "add_role", name: "add a role" },
            { value: "add_employee", name: "add an employee" },
            { value: "update_role", name: "update an employee role" }
        ]
    },
]

const RoleQuestions = [
    {
        type: "input",
        name: "title",
        message: "Enter the name of your new Role"
    },
    {
        type: "number",
        name: "salary",
        message: "Enter the Salary for the new role (Numbers Only)",
    },
    {
        type: "list",
        name: "department_id",
        message: "Select the department you would like to add your new role to...",
        choices: []
    }
]

const DepartmentQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter the name of your new department"
    }
]

const EmployeeQuestions = [
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
        choices: [
        ]
    },
    {
        type: "list",
        name: "manager_id",
        message: "Select the employee/'s manager...",
        choices: [
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

module.exports = {
    MainMenuQuestions,
    DepartmentQuestions,
    EmployeeQuestions,
    UpdateEmployeeRoleQuestions,
    RoleQuestions
}