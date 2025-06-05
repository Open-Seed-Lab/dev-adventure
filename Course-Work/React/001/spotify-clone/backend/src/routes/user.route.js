import { Router } from "express";
import { protectRoute } from '../middleware/protectRoute.middleware.js'
import { getAllUsers } from "../controller/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
// TODO:
// router.get("/messages", protectRoute, getMessages);

export default router;
