import { Router } from "express";
import { protectRoute } from '../middleware/protectRoute.middleware.js'
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;
