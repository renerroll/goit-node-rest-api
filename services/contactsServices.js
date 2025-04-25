import Contact from "../models/Contact.js";

export const listContacts = async (userId) => {
  return await Contact.findAll({ where: { owner: userId } });
};

export const getContactById = async (id) => {
  return await Contact.findByPk(id);
};

export const addContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (id, updateData) => {
  await Contact.update(updateData, { where: { id } });
  return await Contact.findByPk(id);
};

export const removeContact = async (id) => {
  return await Contact.destroy({ where: { id } });
};

export const updateStatusContact = async (id, updateData) => {
  await Contact.update(updateData, { where: { id } });
  return await Contact.findByPk(id);
};

export default {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};