// TODO: Write code to define and export the Employee class
const inquirer = require("inquirer");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

class Employee {
    constructor(name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    getName() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?",
            }
        ]).then(name => {
                this.name = name;
            });
    }

    // getId() {
    //     inquirer.prompt([
    //         {
    //             type: "number",
    //             name: "id",
    //             message: "What is your ID?",
    //             validate: val => /[1-9]/gi.test(val),
    //         }
    //     ]).then(id => {
    //             this.id = id;
    //         });
    // }

    // getEmail() {
    //     inquirer.prompt([
    //         {
    //             type: "input",
    //             name: "email",
    //             message: "What is your email?",
    //         }
    //     ]).then(email => {
    //             this.email = email;
    //         });
    // }

    // getRole() {
    //     inquirer.prompt([
    //         {
    //             type: "list",
    //             name: "role",
    //             message: "What is your role?",
    //             choices: ["Manager", new inquirer.Separator(), "Engineer", new inquirer.Separator(), "Intern"]
    //         }
    //     ]).then(role => {
    //             this.role = role;
    //         });
    //     // return Employee;
    // }

}

module.exports = Employee;