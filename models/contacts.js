const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    return await fs.readFile(contactsPath);
  } catch (error) {
    console.log(error.message);
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
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const currentContact = JSON.parse(contactsData);
    const newFilerContact = currentContact.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newFilerContact));
    return currentContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const currentContact = JSON.parse(contactsData);
    currentContact.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(currentContact));
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const currentContact = JSON.parse(contactsData);
    const getContactById = currentContact.find(
      (contact) => contact.id === contactId
    );

    currentContact.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = body.name;
        contact.email = body.email;
        contact.phone = body.phone;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(currentContact));

    return getContactById;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
