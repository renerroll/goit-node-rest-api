import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authMiddleware);

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  async (req, res, next) => {
    try {
      console.log("Request body before saving:", req.body);
      console.log("User ID from middleware:", req.user?.id);

      const newContact = await createContact(req, res, next);
      res.status(201).json(newContact);
    } catch (error) {
      console.error("Error creating contact:", error);
      next(error);
    }
  }
);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);
contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  updateStatusContact
);

export default contactsRouter;