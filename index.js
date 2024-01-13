//import { program } from "commander";

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      {
        const contacts = await listContacts();
        console.table(contacts);
      }
      break;

    case "get":
      {
        const contactById = await getContactById(id);
        console.log(`Contact with id ${id}:\n`, contactById);
      }
      break;

    case "add":
      {
        const newContact = await addContact(name, email, phone);
        console.log(`You added a new contact:\n`, newContact);
      }
      break;

    case "remove":
      {
        const removedContact = await removeContact(id);

        console.log(`You have removed a contact:\n`, removedContact);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
