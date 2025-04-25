import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactInService,
  } from "../services/contactsServices.js";
  import HttpError from "../helpers/HttpError.js";
  import validateBody from "../helpers/validateBody.js";
  import {
    createContactSchema,
    updateContactSchema,
  } from "../schemas/contactsSchemas.js";
  
  // GET /api/contacts
  async function getAllContacts(req, res) {
    try {
      const contacts = await listContacts();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
  
  // GET /api/contacts/:id
  async function getOneContact(req, res) {
    const { id } = req.params;
    try {
      const contact = await getContactById(id);
      if (!contact) {
        throw HttpError(404, "Not found");
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  
  // DELETE /api/contacts/:id
  async function deleteContact(req, res) {
    const { id } = req.params;
    try {
      const removedContact = await removeContact(id);
      if (!removedContact) {
        throw HttpError(404, "Not found");
      }
      res.status(200).json(removedContact);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  
  // POST /api/contacts
  async function createContact(req, res) {
    try {
      const { error } = createContactSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  
  // PUT /api/contacts/:id
  async function updateContact(req, res) {
    const { id } = req.params;
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
  
    const { name, email, phone } = req.body;
  
    if (!name && !email && !phone) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }
  
    try {
      const updatedContact = await updateContactInService(id, {
        name,
        email,
        phone,
      });
      if (!updatedContact) {
        throw HttpError(404, "Not found");
      }
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  
  export {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
  };