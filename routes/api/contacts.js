const express = require("express");

const { customAlphabet } = require("nanoid");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

const nanoid = customAlphabet("1234567890", 2);

router.get("/", async (req, res, next) => {
  const getContact = await listContacts();
  res.status(200).json(getContact);
});

router.get("/:contactId", async (req, res, next) => {
  const getCurrenContactById = await getContactById(req.params.contactId);
  if (getCurrenContactById.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(getCurrenContactById);
});

router.delete("/:contactId", async (req, res, next) => {
  const removeContactById = await removeContact(req.params.contactId);
  removeContactById.find((contact) => contact.id === req.params.contactId)
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(2).max(10).alphanum().required(),
    email: Joi.string().email().min(2).max(20).required(),
    phone: Joi.string().min(5).max(20).alphanum().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone: Number.parseInt(phone),
  };
  await addContact(newContact);
  res.status(201).json(newContact);
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req?.body;

  const schema = Joi.object({
    name: Joi.string().min(2).max(10).alphanum(),
    email: Joi.string().email().min(2).max(20),
    phone: Joi.string().min(5).max(20).alphanum(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({ message: "missing required name field" });
  }
  const updContact = {
    name,
    email,
    phone,
  };
  const updatedContact = await updateContact(req.params.contactId, updContact);
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
