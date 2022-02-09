const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  await listContacts().then((contacts) =>
    res.status(200).json(JSON.parse(contacts))
  );
});

router.get("/:contactId", async (req, res, next) => {
  await getContactById(req.params.contactId).then((contact) =>
    res.status(200).json(contact)
  );
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
