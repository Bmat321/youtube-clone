import express from "express";
import {
  addVideo,
  addViews,
  deleteVideo,
  getByTags,
  getVideo,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from "../controllers/videos.js";
import { verifyToken } from "./verifyToken.js";

const router = express.Router();

//CREATE A VIDEO
router.post("/", verifyToken, addVideo);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

router.get("/find/:id", getVideo);

router.put("/view/:id", addViews);

router.get("/trend", trend);

router.get("/random", random);

router.get("/sub", verifyToken, sub);

router.get("/tags", getByTags);

router.get("/search", search);

export default router;
