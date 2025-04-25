// contactsControllers.js
import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

// GET /api/contacts
export const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsService.listContacts(userId);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// GET /api/contacts/:id
export const getOneContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact || contact.owner !== userId) throw HttpError(404, "Not found");
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contacts/:id
export const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const removedContact = await contactsService.removeContact(id, userId);

    if (!removedContact) throw HttpError(404, "Not found");
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

// POST /api/contacts
export const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      throw HttpError(400, "Missing required fields");
    }
    const newContact = await contactsService.addContact(
      name,
      email,
      phone,
      userId
    );
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// PUT /api/contacts/:id
export const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Body is empty");
    }
    const updatedContact = await contactsService.updateContact(
      id,
      req.body,
      userId
    );
    if (!updatedContact) throw HttpError(404, "Not found");
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/contacts/:id/favorite
export const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined) {
      throw HttpError(400, "Missing field favorite");
    }
    const updatedContact = await contactsService.updateStatusContact(
      id,
      { favorite },
      userId
    );
    if (!updatedContact) throw HttpError(404, "Not found");
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};