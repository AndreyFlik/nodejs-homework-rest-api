const express = require("express");

const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const getContact = await listContacts();
    res.status(200).json(getContact);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const getCurrenContactById = await getContactById(req.params.contactId);
    res.status(200).json(getCurrenContactById);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removeContactById = await removeContact(req.params.contactId);
    removeContactById
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
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
    name,
    email,
    phone: Number.parseInt(phone),
  };
  try {
    const addNewContact = await addContact(newContact);
    res.status(201).json(addNewContact);
  } catch (error) {
    // res.status(400).json(error.message);
    next(error);
  }
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

  try {
    const updatedContact = await updateContact(
      req.params.contactId,
      updContact
    );
    if (updatedContact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      ...updatedContact._doc,
      name: updContact.name ?? updatedContact.name,
      email: updContact.email ?? updatedContact.email,
      phone: updContact.phone ?? updatedContact.phone,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({ message: "Not found" });
  }

  try {
    const updatedStatusContact = await updateStatusContact(
      req.params.contactId,
      req.body
    );
    res.status(200).json({ ...updatedStatusContact._doc, ...req.body });
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;
