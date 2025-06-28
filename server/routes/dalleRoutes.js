// import express, { response } from "express";
// import * as dotenv from "dotenv";
// // import { Configuration, OpenAIApi } from "openai";

// import OpenAI from "openai";

// dotenv.config();
// const router = express.Router();

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // const openai = new OpenAIApi(configuration);

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.route("/").get((req, res) => {
//   res.send("Hello from Dall-E!");
// });

// router.route("/").post(async (req, res) => {
//   const { prompt } = req.body;
//   try {
//     const aiResponse = await openai.createImage({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });
//     const image = aiResponse.data.data[0].b4_json;
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error?.response.data.error.message);
//   }
// });

// export default router;

// new code
// import express from "express";
// import * as dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();
// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.route("/").get((req, res) => {
//   res.send("Hello from DALL-E!");
// });

// router.route("/").post(async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const aiResponse = await openai.images.generate({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     const image = aiResponse.data[0].b64_json;
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error?.message || "Something went wrong" });
//   }
// });

// export default router;

// hf
// import express from "express";
// import * as dotenv from "dotenv";
// import axios from "axios";

// dotenv.config();
// const router = express.Router();

// const HF_API_URL = "https://router.huggingface.co/nebius/v1/images/generations";
// const HF_API_KEY = process.env.HF_API_KEY;

// router.get("/", (req, res) => {
//   res.send("Hello from Hugging Face Image API!");
// });

// router.post("/", async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt) return res.status(400).json({ error: "Prompt is required" });

//   try {
//     const response = await axios.post(
//       HF_API_URL,
//       { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     const base64String = Buffer.from(response.data, "binary").toString(
//       "base64"
//     );
//     res.status(200).json({ photo: `data:image/png;base64,${base64String}` });
//   } catch (error) {
//     console.error("Error fetching image:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;

// server/Routes/dalleRoutes.js
import express from "express";
import * as dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();
const router = express.Router();

const HF_TOKEN = process.env.HF_TOKEN; // updated to use correct env var name

const client = new InferenceClient(HF_TOKEN);

router.get("/", (req, res) => {
  res.send("Hello from Hugging Face Image API!");
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res
      .status(400)
      .json({ error: "Prompt is required and must be a non-empty string" });
  }

  try {
    const imageBlob = await client.textToImage({
      provider: "auto",
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
      parameters: {
        num_inference_steps: 50,
        guidance_scale: 7.5,
        width: 768,
        height: 768,
      },
    });

    const buffer = await imageBlob.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    const imageDataUri = `data:image/png;base64,${base64String}`;

    res.status(200).json({ photo: imageDataUri });
  } catch (error) {
    console.error("Image generation failed:", error.message);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;
