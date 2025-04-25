import { Router } from 'express';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/messages.controller'
import { protectRoute } from '../middlewares/auth.middleware';

const router = Router()

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)

//router.post("/update-profile", protectRoute, updateProfile);

export default router;
