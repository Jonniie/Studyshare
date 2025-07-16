import React, { useState } from "react";
import {
  Upload as UploadIcon,
  FileText,
  X,
  Plus,
  FolderPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../utils/cloudinary";

const Upload: React.FC = () => {
  const [formData, setFormData] = useState({
    universityName: "",
    facultyName: "",
    departmentName: "",
    year: "",
    courseCode: "",
    title: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const tooLarge = selectedFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (tooLarge) {
      alert(
        `File "${tooLarge.name}" is too large. Maximum allowed size is 10MB.`
      );
      return;
    }
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadedUrls([]);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      alert("Cloudinary config missing!");
      setLoading(false);
      return;
    }

    try {
      const urls: string[] = [];
      for (const file of files) {
        const result = await uploadToCloudinary(file, uploadPreset, cloudName);
        urls.push(result.secure_url);
      }
      setUploadedUrls(urls);
      // You can now send these URLs to your backend with the rest of the form data
      alert("Files uploaded to Cloudinary!");
      // Example: console.log('Cloudinary URLs:', urls);
      // navigate('/explore');
    } catch (err) {
      alert("Cloudinary upload failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Upload Past Questions
        </h1>
        <p className="text-gray-600">
          Share your knowledge with fellow students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Academic Structure */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8">
          <div className="flex items-center space-x-2 mb-6">
            <FolderPlus className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Academic Structure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="universityName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                University Name
              </label>
              <input
                type="text"
                id="universityName"
                name="universityName"
                required
                value={formData.universityName}
                onChange={handleInputChange}
                placeholder="e.g., University of Lagos"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="facultyName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Faculty Name
              </label>
              <input
                type="text"
                id="facultyName"
                name="facultyName"
                required
                value={formData.facultyName}
                onChange={handleInputChange}
                placeholder="e.g., Faculty of Science"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="departmentName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                required
                value={formData.departmentName}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Year of Past Question
              </label>
              <select
                id="year"
                name="year"
                required
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-white text-gray-800">
                  Select year
                </option>
                {Array.from({ length: 10 }, (_, i) => 2024 - i).map((year) => (
                  <option
                    key={year}
                    value={year}
                    className="bg-white text-gray-800"
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="courseCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Course Code
              </label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                required
                value={formData.courseCode}
                onChange={handleInputChange}
                placeholder="e.g., CSC 301"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Past Question Details */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Past Question Details
            </h2>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Data Structures and Algorithms Past Question 2023"
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8">
          <div className="flex items-center space-x-2 mb-6">
            <UploadIcon className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Upload Files
            </h2>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
            {files.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-blue-600" />
                        <span className="text-gray-800 font-medium truncate">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-xl font-medium border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-300">
                    <Plus className="h-5 w-5" />
                    <span>Add More Files</span>
                  </div>
                </label>
              </div>
            ) : (
              <div>
                <UploadIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  PDF or Image files up to 10MB each
                </p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
              multiple
              onChange={handleFileChange}
              className="hidden"
              required={files.length === 0}
            />
          </div>
        </div>

        {/* Uploaded URLs Preview */}
        {uploadedUrls.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md border border-green-200/50 rounded-2xl p-8 mt-4">
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              Uploaded to Cloudinary:
            </h3>
            <ul className="space-y-2">
              {uploadedUrls.map((url, idx) => (
                <li key={idx} className="break-all text-blue-700 underline">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="px-8 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 text-gray-700 rounded-xl hover:bg-white/70 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              "Upload Past Questions"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
