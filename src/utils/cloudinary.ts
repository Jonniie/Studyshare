import axios from "axios";

export const uploadToCloudinary = async (
  file: File,
  uploadPreset: string,
  cloudName: string
) => {
  // Use 'raw' for non-images, 'image' for images
  const isImage = file.type.startsWith("image/");
  const resourceType = isImage ? "image" : "raw";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // Contains .secure_url, .public_id, etc.
};
