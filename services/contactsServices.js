import { Contact } from "../models/contact.js";

export async function listContacts({ skip = 0, limit = 20, favorite, owner }) {
  const where = { owner };

  if (favorite !== undefined) {
    where.favorite = favorite === "true";
  }

  return await Contact.findAll({
    where,
    offset: skip,
    limit: parseInt(limit),
  });
}

export async function getContactById(contactId) {
  return await Contact.findByPk(contactId);
}

export async function addContact(name, email, phone, owner) {
  return await Contact.create({ name, email, phone, owner });
}

export async function removeContact(contactId) {
  const contact = await getContactById(contactId);

  if (!contact) return null;

  await contact.destroy();

  return contact;
}

export async function updateContact(contactId, updates) {
  const contact = await getContactById(contactId);

  if (!contact) return null;

  await contact.update(updates);
  
  return contact;
}

export async function updateStatusContact(contactId, updates) {
  return await updateContact(contactId, updates);
}
