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
  await getContactById(req.params.contactId).then((contact) => {
    if (contact.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  });
});

// router.delete("/:contactId", async (req, res, next) => {
//   await removeContact(req.params.contactId);
//   if(){res.status(200).json({ message: "contact deleted" })}
//   if(){res.status(404).json({ message: "Not found" })}
// });

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
