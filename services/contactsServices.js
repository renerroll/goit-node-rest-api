import Contact from "../db/models/Contact.js";

const listContacts = (ownerId) => {
  return Contact.findAll({ where: { owner: ownerId } });
};

const getContactById = (id) => {
  return Contact.findByPk(id);
};

const addContact = (data) => {
  return Contact.create(data);
};

const updateContact = async (contactId, { name, email, phone }, ownerId) => {
  const contact = await Contact.findOne({ where: { id: contactId, owner: ownerId } });
  if (!contact) return null;

  return contact.update({ name, email, phone }, { returning: true });
};

const removeContact = async (contactId, ownerId) => {
  const contact = await Contact.findOne({ where: { id: contactId, owner: ownerId } });
  if (!contact) return null;

  await contact.destroy();
  return contact.toJSON();
};

const updateStatusContact = async (contactId, favorite, ownerId) => {
  const contact = await Contact.findOne({ where: { id: contactId, owner: ownerId } });
  if (!contact) return null;

  return contact.update({ favorite }, { returning: true });
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};