import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  likes,
  subscribe,
  unSubscribe,
  UpdateUser,
} from "../controllers/users.js";

import { verifyToken } from "./verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyToken, UpdateUser);

//DELETE USER
router.delete("/:id", verifyToken, deleteUser);

//GET USER
router.get("/find/:id", getUser);

//SUBSCRIBE A VIDEO
router.put("/sub/:id", verifyToken, subscribe);

//UNSUBCRIBE A VIDEO
router.put("/unsub/:id", verifyToken, unSubscribe);

//LIKE A VIDEO
router.put("/like/:videoId", verifyToken, likes);

//DISLIKE A VIDEO
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
