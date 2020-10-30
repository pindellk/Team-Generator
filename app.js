const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeList = [];

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "number",
        name: "id",
        message: "What is your ID?",
        validate: val => /[1-9]/gi.test(val),
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager", new inquirer.Separator(), "Engineer", new inquirer.Separator(), "Intern"]
    }
];

const managerQuestion = {
    type: "number",
    name: "officeNumber",
    message: "What is your office number?",
    validate: val => /[1-9]/gi.test(val),
}

const engineerQuestion = {
    type: "input",
    name: "github",
    message: "What is your github account?"
}

const internQuestion = {
    type: "input",
    name: "school",
    message: "What is your school?"
}

const additionalEmployee = {
    type: "confirm",
    name: "add",
    message: "Would you like to enter more employees?"
}

function addEmployee() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            let nextQuestion;
            if (answers.role === "Manager") {
                nextQuestion = managerQuestion;
            }
            if (answers.role === "Engineer") {
                nextQuestion = engineerQuestion;
            }
            if (answers.role === "Intern") {
                nextQuestion = internQuestion;
            }
            inquirer
                .prompt(nextQuestion)
                .then((answer) => {
                    Object.assign(answers, answer);
                    let employee;
                    if (answers.role === "Manager") {
                        employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                    }
                    if (answers.role === "Intern") {
                        employee = new Intern(answers.name, answers.id, answers.email, answers.school);
                    }
                    if (answers.role === "Engineer") {
                        employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
                    }
                    employeeList.push(employee);
                    inquirer
                        .prompt(additionalEmployee)
                        .then((answer) => {
                            if (answer.add === true) {
                                addEmployee();
                            }
                        })
                    console.log(employeeList);
                })
        })
}

addEmployee();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// render()


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// function addEngineer(answers) {
//     inquirer.prompt({
//         type: "input",
//         name: "github",
//         message: "What is your GitHub account?"
//     }).then((answer) => {
//         Object.assign(answers, answer);
//         const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github, answers.role);
//     });
// }