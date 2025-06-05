import { Router } from "express";
import { protectRoute, requireAdmin } from '../middleware/protectRoute.middleware.js'
import { createSong, deleteSong, createAlbum, deleteAlbum } from "../controller/admin.controller.js";

const router = Router();

router.use(protectRoute, requireAdmin)

router.post("/check", (req, res) => {
	res.status(200).json({ success: true, data: { admin: true } })
});
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

// router.post("/check", protectRoute, requireAdmin, (req, res) => {
// 	res.status(200).json({ success: true, data: { admin: true } })
// });
// router.post("/songs", protectRoute, requireAdmin, createSong);
// router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);
// router.post("/albums", protectRoute, requireAdmin, createAlbum);
// router.delete("/albums/:id", protectRoute, requireAdmin, deleteAlbum);

export default router;
