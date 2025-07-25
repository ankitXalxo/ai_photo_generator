// import express from "express";
// import * as dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";

// import Post from "../mongodb/models/post.js";

// dotenv.config();
// const router = express.Router();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// //GET ALL POSTS
// router.route("/").get(async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     res.status(200).json({ success: true, data: posts });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// //CREATE A POST
// router.route("/").post(async (req, res) => {
//   try {
//     const { name, prompt, photo } = req.body;
//     const photoUrl = await cloudinary.uploader.upload(photo);

//     const newPost = await Post.create({
//       name,
//       prompt,
//       photo: photoUrl.url,
//     });

//     res.status(201).json({ success: true, data: newPost });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });
// export default router;

import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    if (!Array.isArray(posts)) {
      return res
        .status(500)
        .json({ success: false, message: "Data is not an array" });
    }
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ CREATE A POST
router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    if (!name || !prompt || !photo) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
