import errorWrapper from '../helpers/errorWrapper.js';
import HttpError from '../helpers/HttpError.js';
import contactsService from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts(req.user.id);
  res.json({ status: 200, data: contacts });
};

const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);

  if (!contact || contact.owner !== req.user.id) {
    throw HttpError(404, "Not found");
  }

  res.json({ status: 200, data: contact });
};

const deleteContact = async (req, res) => {
  const deletedContact = await contactsService.removeContact(req.params.id, req.user.id);

  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({ status: 200, data: deletedContact });
};

const createContact = async (req, res) => {
  const createdContact = await contactsService.addContact({
    ...req.body,
    owner: req.user.id,
  });

  res.status(201).json({ status: 201, data: createdContact });
};

const updateContact = async (req, res) => {
  const updatedContact = await contactsService.updateContact(req.params.id, req.body, req.user.id);

  if (!updatedContact) throw HttpError(404, "Not found");

  res.json({ status: 200, data: updatedContact });
};

const updateStatusContact = async (req, res) => {
  const updatedContact = await contactsService.updateStatusContact(req.params.id, req.body.favorite, req.user.id);

  if (!updatedContact) throw HttpError(404, "Not found");

  res.json({ status: 200, data: updatedContact });
}

export default {
  getAllContacts: errorWrapper(getAllContacts),
  getOneContact: errorWrapper(getOneContact),
  deleteContact: errorWrapper(deleteContact),
  createContact: errorWrapper(createContact),
  updateContact: errorWrapper(updateContact),
  updateStatusContact: errorWrapper(updateStatusContact),
};