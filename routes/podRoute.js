import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  addToFavouritesController,
  createEpisodeController,
  createPodcastController,
  deleteEpisodeController,
  deletePodcastController,
  fetchEpisodeController,
  getAllPodcastsController,
  getFavouritesController,
  getPodcastController,
  getPodcastsByIDController,
  removeFromFavouritesController,
  updateEpisodeController,
  updatePodcastController,
} from "../controllers/podController.js";
const router = express.Router();

router.delete("/delete-podcast/:pid", requireSignIn, deletePodcastController);
router.post("/create-podcast", requireSignIn, createPodcastController);
router.get("/get-all-podcasts", getAllPodcastsController);
router.put("/update-podcast", requireSignIn, updatePodcastController);
router.get("/get-podcast/:pid", requireSignIn, getPodcastController);
router.get("/get-podcasts-by-id", requireSignIn, getPodcastsByIDController);
router.post("/create-episode", requireSignIn, createEpisodeController);
router.post("/get-episode", requireSignIn, fetchEpisodeController);
router.put("/update-episode", requireSignIn, updateEpisodeController);
router.delete(
  "/delete-episode/:pid/:id",
  requireSignIn,
  deleteEpisodeController
);
router.get('/get-likes',requireSignIn,getFavouritesController)
router.post('/set-like',requireSignIn,addToFavouritesController)
router.post('/remove-like',requireSignIn,removeFromFavouritesController)
export default router;
