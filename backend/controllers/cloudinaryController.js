import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImages = async (req, res) => {
  try {
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto', // jpeg/png
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (err) {
    console.log('Cloudinary error', err);
  }
};

export const removeImage = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    res.send('OK');
  });
};
