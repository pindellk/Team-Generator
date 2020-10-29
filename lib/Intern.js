const Employee = require("./Employee");

class Intern extends Employee {
    constructor (name, id, email, school, role) {
        super(school, role);
        this.school = school;
        this.role = "Intern";
    }

    getSchool() {
        return this.school;
    }
    
    getRole() {
        return this.role;
    }
}

module.exports = Intern;