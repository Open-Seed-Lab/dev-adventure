
import { Router } from "express";
import { protectRoute, requireAdmin } from '../middleware/protectRoute.middleware.js'
import { getAllSongs, getSongById, getFeaturedSongs, getMadeForYou, getTrending } from "../controller/song.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/:songId", getSongById);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYou);
router.get("/trending", getTrending);

export default router;
