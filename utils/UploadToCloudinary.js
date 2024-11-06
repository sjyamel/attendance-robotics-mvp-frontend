// m2ctzo63

import axios from 'axios';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/doxklmomb/upload'; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'm2ctzo63'; // Replace with your Cloudinary upload preset

const UploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET); // Required by Cloudinary for unsigned uploads

    // Uploading the file to Cloudinary
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Extract the URL from the response
    const { secure_url } = response.data;
    return secure_url; // Return the uploaded file's URL
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error; // Rethrow the error for further handling if nee   ded
  }
};

export default UploadToCloudinary;