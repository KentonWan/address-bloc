const inquirer = require('inquirer');
const ContactController = require('./ContactController');

module.exports = class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "Get the date",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();
  }

  main() {
    console.log("Welcome to AddressBloc!")
    inquirer.prompt(this.mainMenuQuestions).then((response)=>{
      switch(response.mainMenuChoice){
        case "Add new contact":
          this.addContact();
          break;
        case "Get the date":
          this.getDate();
          break;
        case "Exit":
          this.exit();
        default:
          console.log("Invalid Input");
          this.main();
      }
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  clear() {
    console.log("\x1Bc");
  }

  addContact(){
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then((answers)=> {
      this.book.addContact(answers.name, answers.phone).then((contact)=> {
        console.log("contact added successfully!");
        this.main();
      }).catch((err)=>{
        console.log(err);
        this.main();
      });
    })
  }

  getDate() {
    let date = new Date()
    console.log(date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }))
    this.main();
  }

  exit(){
    console.log("Thanks for using AddressBloc!")
    process.exit();
  }

  getContactCount(){
    return this.contacts.length;
  }
}
