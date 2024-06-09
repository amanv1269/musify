const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Song = require("../models/songModel");
const User = require("../models/userModel");

router.post("/get-all-songs", authMiddleware, async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).send({
      message: "songs fetched succesfully",
      success: true,
      data: songs,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error fetching songs", success: false, data: error });
  }
});

router.post("/add-playlist", authMiddleware, async (req, res) => {
  try {
    console.log(req)
    const user = await user.findById(req.body.userId);
    const existingPlaylists = user.playlists;
    existingPlaylists.push({
      name: req.body.name,
      songs: req.body.songs,
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Playlist Created succesfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "error creating playlist",
      success: false,
      data: error,
    });
  }
});

router.post("/update-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await user.findById(req.body.userId);
    let existingPlaylists = user.playlists;
    existingPlaylists = existingPlaylists.map((playlists) => {
      if (playlists.name === req.body.name) {
        playlists.songs = req.body.songs;
      }
      return playlists;
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Playlist updated succesfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error updating playlist",
      success: false,
      data: error,
    });
  }
});

router.post("/delete-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await user.findById(req.body.userId);
    let existingPlaylists = user.playlists;
    existingPlaylists = existingPlaylists.filter((playlists) => {
      if (playlists.name === req.body.name) {
        return false;
      }
      return true;
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Playlist deleted succesfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error deleting playlist",
      success: false,
      data: error,
    });
  }
});

module.exports = router;
