import { createError } from "../routes/err.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, nect) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch {
    next(err);
  }
};

export const deleteComment = async (req, res, nect) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await video.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted successfully");
    } else {
      return next(createError(403, "You can only delete ypur comment"));
    }
  } catch {
    nect(err);
  }
};
export const getComment = async (req, res, nect) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch {
    nect(err);
  }
};
