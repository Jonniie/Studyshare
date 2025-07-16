// Simple JWT decoder (for client-side use)
export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

// Extract user info from JWT token
export const getUserFromToken = (token: string) => {
  const decoded = decodeJWT(token);
  if (!decoded) return null;

  return {
    id: decoded.id || decoded.sub || Math.random().toString(36),
    email: decoded.email,
    fullName: decoded.full_name || decoded.name || "User",
    university: decoded.university || "Unknown",
    role: decoded.role || "student",
    createdAt: decoded.created_at ? new Date(decoded.created_at) : new Date(),
  };
};

import axios from "axios";

export const uploadToCloudinary = async (
  file: File,
  uploadPreset: string,
  cloudName: string
) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // Contains .secure_url, .public_id, etc.
};
