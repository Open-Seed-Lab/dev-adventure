import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";
const router = Router();

router.get("/checkAuth", () => {
	console.log('[spotify-clone] [backend] - checkAuth')
});
router.get("/login", () => {
	console.log('[spotify-clone] [backend] - login')
});
router.get("/logout", () => {
	console.log('[spotify-clone] [backend] - logout')
});

router.get("/callback", authCallback);

export default router;
