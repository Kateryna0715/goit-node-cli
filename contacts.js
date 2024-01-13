const { nanoid } = require("nanoid");

const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("db", "contacts.json");
require("colors");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contactById = data.find((contact) => contact.id === contactId);
  if (!contactById) {
    console.log(`Contact with id: ${contactId} doesn't exist`.red);
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contactById = await getContactById(contactId);

  const newList = data.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));

  return contactById;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();

  const isExist = data.find((contact) => {
    contact.email === email;
  });

  if (!isExist) {
    console.log("Contact with this email is already exist!".red);

    return null;
  }

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
