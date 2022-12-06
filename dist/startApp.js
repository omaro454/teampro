const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const inquirer = require('inquirer');
const fs = require("fs");
const whatsNext = ["Add an Engineer", "Add an Intern", "Finish building my team"];

class startApp {

    constructor() {

    }

    begin() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is your name?',
                    name: 'name',
                },
                {
                    type: 'input',
                    message: 'What is your employee ID?',
                    name: 'id',
                },
                {
                    type: 'input',
                    message: 'What is your email?',
                    name: 'email',
                },
                {
                    type: 'input',
                    message: 'What is your office number?',
                    name: 'officeNumber',
                }
            ]).then((response) => {
                console.log(response);
                const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
                console.log(manager);
                console.log(manager);
                manager.getName();
                const managerHtml = `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Work Profile Generator</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
                        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
                    <link rel="stylesheet" href="./style.css" />
                </head>
                
                <body>
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">My Team</h1>
                        </div>
                    </div>
                    <div class="belowJumbo">
                        <div class="cards">
                            <div class="cardHeader">
                                <h4>${manager.getName()}</h4>
                                <h5>☕️ ${manager.getRole()}</h5>
            </div>
            <div class="cardInfo">
                <p>ID: ${manager.getId()}</p>
                <p>Email: <a href="mailto: ${manager.getEmail()}">${manager.getEmail()}</p> </a>
                <p>Office Number: ${manager.getOfficeNumber()}</p>
            </div>
        </div>`;
                fs.writeFile("dist/index.html", managerHtml, (err) =>
                    err ? console.error(err) : console.log("Success!"));

                console.log(managerHtml);
                this.menu();
            });
    }

    menu() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What would you like to do next?',
                    choices: whatsNext,
                    name: 'next',
                }
            ]).then((response) => {

                if (response.next == "Add an Engineer") {
                    this.engineerHTML();
                } else if (response.next == "Add an Intern") {
                    this.internHTML();
                } else {
                    this.finishTeam();
                }
            })
    }

    engineerHTML() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is your name?',
                    name: 'name',
                },
                {
                    type: 'input',
                    message: 'What is your employee ID?',
                    name: 'id',
                },
                {
                    type: 'input',
                    message: 'What is your email?',
                    name: 'email',
                },
                {
                    type: 'input',
                    message: 'What is your GitHub username?',
                    name: 'github',
                }
            ]).then((response) => {
                const engineer = new Engineer(response.name, response.id, response.email, response.github);
                console.log(engineer);

                let engineerHtml = ` <div class="cards">
                <div class="cardHeader">
                    <h4>${engineer.getName()}</h4>
                    <h5>👓 ${engineer.getRole()}</h5>
                </div>
                <div class="cardInfo">
                    <p>ID: ${engineer.getId()}</p>
                    <p>Email: <a href="mailto: ${engineer.getEmail()}">${engineer.getEmail()}</p> </a>
                    <p>Github: <a href="https://github.com/${engineer.getGithub()}">${engineer.getGithub()}</a></p>
                </div>
            </div>`;

                fs.appendFile("dist/index.html", engineerHtml, (err) =>
                    err ? console.error(err) : console.log("Success!"));

                console.log(engineerHtml);
                this.menu();
            })
    }

    internHTML() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is your name?',
                    name: 'name',
                },
                {
                    type: 'input',
                    message: 'What is your employee ID?',
                    name: 'id',
                },
                {
                    type: 'input',
                    message: 'What is your email?',
                    name: 'email',
                },
                {
                    type: 'input',
                    message: 'What is the name of your school?',
                    name: 'school',
                }
            ]).then((response) => {
                const intern = new Intern(response.name, response.id, response.email, response.school);
                console.log(intern);

                let internHtml = ` <div class="cards">
                <div class="cardHeader">
                    <h4>${intern.getName()}</h4>
                    <h5>👓 ${intern.getRole()}</h5>
                </div>
                <div class="cardInfo">
                    <p>ID: ${intern.getId()}</p>
                    <p>Email: <a href="mailto: ${intern.getEmail()}">${intern.getEmail()}</p> </a>
                    <p>School: ${intern.getSchool()}</p>
                </div>
            </div>`;

                fs.appendFile("dist/index.html", internHtml, (err) =>
                    err ? console.error(err) : console.log("Success!"));

                console.log(internHtml);
                this.menu();
            })
    }

    finishTeam() {
        const finalHtml = `
        </div>
</body>
</html>`;

        fs.appendFile("dist/index.html", finalHtml, (err) =>
            err ? console.error(err) : console.log("Success!"));
    }
    return;
}

module.exports = startApp;