"use strict";

/* ------------------------------------------------- */
/*                 SOULJOURNEY API                   */
/* ------------------------------------------------- */

// UPLOAD (Multer + AWS S3 Middleware)
// npm i multer @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

// Create AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Store files in memory (not on disk)
const storage = multer.memoryStorage();

// Create Multer middleware
const upload = multer({ storage });

// Function to upload to S3 (General Usage)
/*
const uploadToS3 = async (file, folder = "uploads") => {
  const fileName = `${folder}/${Date.now()}_${file.originalname.replace(
    /\s+/g,
    "-"
  )}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3Client.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};
*/

// Export middleware
module.exports = {
  upload,
  s3Client,
  PutObjectCommand,
  DeleteObjectCommand,
};
