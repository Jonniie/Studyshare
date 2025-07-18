import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  FolderOpen,
  BookOpen,
  Users,
  FileText,
  Plus,
} from "lucide-react";
import { api } from "../utils/api";

interface PastQuestion {
  university_name: string;
  faculty_name: string;
  department_name: string;
  year: string;
  course_code: string;
  past_question: string;
}

interface FacultyMap {
  [faculty: string]: {
    [department: string]: PastQuestion[];
  };
}

// Explorer item type for the grid
interface ExplorerItem {
  type: "university" | "faculty" | "department" | "file";
  name: string;
  count?: number;
  year?: string;
  url?: string;
}

const Explore: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [universities, setUniversities] = useState<string[]>([]); // List of university names
  const [universityCounts, setUniversityCounts] = useState<
    Record<string, number>
  >({});
  const [facultyMap, setFacultyMap] = useState<FacultyMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDoc, setShowDoc] = useState<string | null>(null);
  const [docLoading, setDocLoading] = useState(false);

  useEffect(() => {
    if (currentPath.length === 0) {
      setLoading(true);
      const staticUniversities = [
        "University of Lagos",
        "University of Ibadan",
        "Obafemi Awolowo University",
        "University of Nigeria, Nsukka",
        "Ahmadu Bello University",
        "Federal University of Technology, Akure",
        "Lagos State University",
        "Covenant University",
        "Babcock University",
      ];
      setUniversities(staticUniversities);
      Promise.all(
        staticUniversities.map(async (uni) => {
          try {
            const res = await api.get(`/get-pq/${uni}`);
            return {
              uni,
              count: res.total,
            };
          } catch {
            return { uni, count: 0 };
          }
        })
      ).then((results) => {
        const counts: Record<string, number> = {};
        results.forEach(({ uni, count }) => {
          counts[uni] = count;
        });
        setUniversityCounts(counts);
        setLoading(false);
      });
    }
  }, [currentPath]);

  // Helper to get current explorer items based on currentPath
  function getExplorerItems(): ExplorerItem[] {
    if (currentPath.length === 0) {
      // Universities
      return universities.map((uni) => ({
        type: "university",
        name: uni,
        count: universityCounts[uni] || 0,
      }));
    }
    if (currentPath.length === 1 && facultyMap) {
      // Faculties
      return Object.keys(facultyMap).map((faculty) => ({
        type: "faculty",
        name: faculty,
        count: Object.values(facultyMap[faculty]).reduce(
          (acc, arr) => acc + arr.length,
          0
        ),
      }));
    }
    if (currentPath.length === 2 && facultyMap) {
      // Departments
      const faculty = currentPath[1];
      return Object.keys(facultyMap[faculty] || {}).map((dept) => ({
        type: "department",
        name: dept,
        count: facultyMap[faculty][dept].length,
      }));
    }
    if (currentPath.length === 3 && facultyMap) {
      // Past Questions
      const faculty = currentPath[1];
      const dept = currentPath[2];
      return (facultyMap[faculty]?.[dept] || []).map((pq: PastQuestion) => ({
        type: "file",
        name: pq.course_code || "Untitled",
        year: pq.year,
        url: pq.past_question,
      }));
    }
    return [];
  }

  // Handler for clicking an explorer item
  const handleExplorerClick = async (item: ExplorerItem) => {
    if (item.type === "university") {
      setLoading(true);
      setCurrentPath([item.name]);
      try {
        const res = await api.get(`/get-pq/${item.name}`);
        const data = Array.isArray(res) ? res : res.data || [];
        const faculties: FacultyMap = {};
        data.forEach((pq: PastQuestion) => {
          const faculty = pq.faculty_name || "Unknown Faculty";
          const department = pq.department_name || "Unknown Department";
          if (!faculties[faculty]) faculties[faculty] = {};
          if (!faculties[faculty][department])
            faculties[faculty][department] = [];
          faculties[faculty][department].push(pq);
        });
        setFacultyMap(faculties);
      } catch {
        setFacultyMap({});
      } finally {
        setLoading(false);
      }
    } else if (item.type === "faculty") {
      setCurrentPath([currentPath[0], item.name]);
    } else if (item.type === "department") {
      setCurrentPath([currentPath[0], currentPath[1], item.name]);
    } else if (item.type === "file") {
      setDocLoading(true);
      setShowDoc(item.url || null);
    }
  };

  // Handler for breadcrumbs
  const handleBreadcrumbClick = (idx: number) => {
    if (idx === -1) {
      setCurrentPath([]);
    } else if (idx === 0) {
      setCurrentPath([currentPath[0]]);
    } else if (idx === 1) {
      setCurrentPath([currentPath[0], currentPath[1]]);
    }
  };

  // Add a mapping for university logos
  const universityLogos: Record<string, string> = {
    "Obafemi Awolowo University": "/oau.svg",
    "University of Lagos": "/unilag.png",
    "Covenant University": "/covenant.png",
    // Add more as needed
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4 border-indigo-500 mb-6"></div>
            <div className="text-xl font-semibold text-gray-700">
              Loading...
            </div>
          </div>
        </div>
      )}
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 mb-6">
        <button
          onClick={() => handleBreadcrumbClick(-1)}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          Universities
        </button>
        {currentPath.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <button
              onClick={() => handleBreadcrumbClick(idx)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {crumb}
            </button>
          </React.Fragment>
        ))}
      </nav>
      {/* Explorer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getExplorerItems().length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 h-full min-h-[200px] col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <Plus className="h-10 w-10 text-blue-500 mb-4" />
            <div className="text-lg font-semibold text-gray-800 mb-2">
              No entries found
            </div>
            <div className="text-gray-600 mb-4 text-center">
              Be the first to upload a document for this section.
            </div>
            <a
              href="/upload"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span>Upload Document</span>
            </a>
          </div>
        ) : (
          getExplorerItems().map((item, idx) => (
            <div
              key={item.name + idx}
              onClick={() => handleExplorerClick(item)}
              className="group relative cursor-pointer"
            >
              <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 group-hover:scale-105 flex flex-col items-center justify-center h-[400px]">
                <div className="mb-4">
                  {item.type === "university" &&
                    (universityLogos[item.name] ? (
                      <img
                        src={universityLogos[item.name]}
                        alt={item.name + " logo"}
                        className="h-25 w-25 object-contain"
                      />
                    ) : (
                      <BookOpen className="h-10 w-10 text-purple-400" />
                    ))}
                  {item.type === "faculty" && (
                    <Users className="h-10 w-10 text-cyan-400" />
                  )}
                  {item.type === "department" && (
                    <FolderOpen className="h-10 w-10 text-pink-400" />
                  )}
                  {item.type === "file" && (
                    <FileText className="h-10 w-10 text-green-400" />
                  )}
                </div>
                <div className="text-lg font-semibold text-gray-800 text-center mb-2">
                  {item.name}
                </div>
                {item.type !== "file" && (
                  <div className="text-gray-600 text-sm">
                    {item.count} {item.count === 1 ? "Document" : "Documents"}
                  </div>
                )}
                {item.type === "file" && (
                  <div className="text-gray-500 text-xs">Year: {item.year}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Document Modal */}
      {showDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
            <button
              className="absolute top-1  right-2 text-gray-500 hover:text-red-500 text-4xl font-bold"
              onClick={() => setShowDoc(null)}
              aria-label="Close"
            >
              &times;
            </button>
            {docLoading && (
              <div className="flex flex-col items-center justify-center w-full h-[70vh] absolute top-0 left-0 z-10 bg-white/80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 border-indigo-500 mb-4"></div>
                <div className="text-lg text-gray-700">Loading document...</div>
              </div>
            )}
            <iframe
              src={showDoc}
              title="Document Viewer"
              className="w-full h-[70vh] rounded-xl border"
              frameBorder={0}
              allowFullScreen
              onLoad={() => setDocLoading(false)}
              style={docLoading ? { visibility: "hidden" } : {}}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
