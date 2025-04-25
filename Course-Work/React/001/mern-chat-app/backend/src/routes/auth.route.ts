import { Router } from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller'
import { protectRoute } from '../middlewares/auth.middleware';

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/update-profile", protectRoute, updateProfile);
// router.post(
// 	"/update-profile",
// 	protectRoute,
// 	(req, resp) => {
// 		updateProfile(req, resp)
// 	}
// )
router.post("/check", protectRoute, checkAuth);

export default router;
