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
import { api } from "../utils/api";

const Upload: React.FC = () => {
  const [formData, setFormData] = useState({
    university_name: "",
    faculty_name: "",
    department_name: "",
    year: "",
    course_code: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);

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
        const sanitizedTitle =
          title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "")
            .substring(0, 100) || "uploaded_file";
        const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
        const ext = extMatch ? `.${extMatch[1].toLowerCase()}` : "";
        const fileName = sanitizedTitle + ext;
        const result = await uploadToCloudinary(
          file,
          uploadPreset,
          cloudName,
          fileName
        );
        urls.push(result.secure_url);
      }
      // Send to backend
      const payload = {
        ...formData,
        university_name: formData.university_name.trim(),
        past_question: urls.length === 1 ? urls[0] : urls, // send as string if one file, array if multiple
      };
      console.log(payload);
      await api.post("/create-pq", payload);
      setShowSuccess(true);
      // navigate("/explore"); // Navigation will be handled by popup button
    } catch (err) {
      setShowError(
        "Upload failed! " + (err instanceof Error ? err.message : "")
      );
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
                htmlFor="university_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                University Name
              </label>
              <input
                type="text"
                id="university_name"
                name="university_name"
                required
                value={formData.university_name}
                onChange={handleInputChange}
                placeholder="  University of Lagos"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="faculty_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Faculty Name
              </label>
              <input
                type="text"
                id="faculty_name"
                name="faculty_name"
                required
                value={formData.faculty_name}
                onChange={handleInputChange}
                placeholder="  Faculty of Science"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="department_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department Name
              </label>
              <input
                type="text"
                id="department_name"
                name="department_name"
                required
                value={formData.department_name}
                onChange={handleInputChange}
                placeholder="  Computer Science"
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
                htmlFor="course_code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Course Code
              </label>
              <input
                type="text"
                id="course_code"
                name="course_code"
                required
                value={formData.course_code}
                onChange={handleInputChange}
                placeholder="  CSC 301"
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="  Data Structures and Algorithms Past Question 2023"
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

        {/* Popup Modal for Success */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
              <p className="text-gray-700 mb-6">
                Your past question has been uploaded successfully.
              </p>
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                onClick={() => {
                  setShowSuccess(false);
                  navigate("/explore");
                }}
              >
                Go to Explore
              </button>
            </div>
          </div>
        )}
        {/* Popup Modal for Error */}
        {showError && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Failed</h2>
              <p className="text-gray-700 mb-6">{showError}</p>
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                onClick={() => setShowError(null)}
              >
                Close
              </button>
            </div>
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
