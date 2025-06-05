import { Router } from "express";
import { protectRoute } from '../middleware/protectRoute.middleware.js'
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute, getStats);

export default router;
