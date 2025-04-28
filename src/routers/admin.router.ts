import { Router } from "express";
import adminController from "../controllers/admin.controller";
const AdminRouter = Router();

AdminRouter.get("/", adminController.getAdminHome);
AdminRouter.post("/createOrganization", adminController.createOrganization);

export default AdminRouter;
