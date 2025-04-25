import Contact from "../models/contactsModel.js";

async function listContacts() {
  return await Contact.findAll();
}

async function getContactById(contactId) {
  const contact = await Contact.findByPk(contactId);
  console.log(`Found contact with ID ${contactId}:`, contact);
  return contact;
}

async function addContact(name, email, phone) {
  return await Contact.create({ name, email, phone });
}

const updateContact = async (contactId, data) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  return await contact.update(data);
};

const updateStatusContact = async (contactId, data) => {
  const contact = await Contact.findByPk(contactId);

  if (!contact) {
    console.log(`Contact with ID ${contactId} not found`);
    return null;
  }

  if (contact.favorite === true && data.favorite === true) {
    console.log(`Contact ${contactId} is already added to favorites`);
    return contact;
  }

  if (contact.favorite === true && data.favorite === false) {
    const updatedContact = await contact.update({ favorite: data.favorite });

    console.log(
      `Contact ${contactId} favorite status updated to: ${updatedContact.favorite}`
    );

    return updatedContact;
  }

  if (contact.favorite === false && data.favorite === true) {
    const updatedContact = await contact.update({ favorite: data.favorite });

    console.log(
      `Contact ${contactId} favorite status updated to: ${updatedContact.favorite}`
    );

    return updatedContact;
  }
};

async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

export default {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};