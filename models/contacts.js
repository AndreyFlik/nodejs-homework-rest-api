const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

// mongoose.connect(process.env.DB_HOST, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log("error", err);
//   process.exit(1);
// });
// db.once("open", () => {
//   console.log("Database connection successful");
// });

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await Contact.findById(contactId);
  return contacts;
};

const removeContact = async (contactId) => {
  const contacts = await Contact.findByIdAndRemove(contactId);
  return contacts;
};

const addContact = async (body) => {
  const contacts = await Contact.create(body);
  return contacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await Contact.findByIdAndUpdate(contactId, body);
  return contacts;
};

const updateStatusContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
