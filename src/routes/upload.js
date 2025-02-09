import { Router } from "express"
import multer from "multer"
import cloudinary from "cloudinary"

const router = Router()
const upload = multer({ dest: "uploads/" })

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    res.status(200).json({ url: result.secure_url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})