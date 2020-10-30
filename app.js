// Create dependencies 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty employee array
const employeeList = [];

// Main questions array
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

// Employee specific questions
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

// Prompt user for employee data; divert path based on selected role 
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
                            else {
                                const html = render(employeeList);
                                fs.writeFileSync(outputPath, html, (err) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        console.log("File written successfully\n");
                                    }
                                });
                            }
                        })
                })
        })
}

addEmployee();
