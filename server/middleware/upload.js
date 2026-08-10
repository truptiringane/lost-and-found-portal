import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|webp|gif/
  const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)
  if (ok) return cb(null, true)
  cb(new Error('Only image files are allowed (jpg, png, webp, gif)'))
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB per file, max 5 files
})

export default upload
