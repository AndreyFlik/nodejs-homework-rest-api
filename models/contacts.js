const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    return await fs.readFile(contactsPath);
  } catch (error) {
    return console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const currentContact = JSON.parse(contactsData);
    const newFilerContact = currentContact.filter(
      (contact) => contact.id === contactId
    );
    return newFilerContact;
  } catch (error) {
    return console.log(error.message);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
