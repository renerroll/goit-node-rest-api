import express from "express";

import contactsController from "../controllers/contactsControllers.js";
import auth from "../middlewares/auth.js";
import validateBody from '../helpers/validateBody.js';
import { createContactSchema, updateContactSchema, updateContactStatusSchema } from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.use(auth);

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", contactsController.getOneContact);

contactsRouter.delete("/:id", contactsController.deleteContact);

contactsRouter.post(
    "/",
    validateBody(createContactSchema),
    contactsController.createContact,
);

contactsRouter.put(
    "/:id",
    validateBody(updateContactSchema),
    contactsController.updateContact,
);

contactsRouter.patch(
    "/:id/favorite",
    validateBody(updateContactStatusSchema),
    contactsController.updateStatusContact,
);

export default contactsRouter;