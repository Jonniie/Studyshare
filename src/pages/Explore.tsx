import React, { useState } from "react";
import {
  ChevronRight,
  FolderOpen,
  Plus,
  Search,
  BookOpen,
  Users,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockUniversities } from "../data/mockData";

interface BreadcrumbItem {
  name: string;
  path: string;
}

const Explore: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const getCurrentData = () => {
    if (currentPath.length === 0) {
      return mockUniversities.map((uni) => ({
        id: uni.id,
        name: uni.name,
        type: "university" as const,
        count: uni.faculties.reduce(
          (acc, faculty) =>
            acc +
            faculty.departments.reduce(
              (deptAcc, dept) =>
                deptAcc +
                dept.years.reduce(
                  (yearAcc, year) =>
                    yearAcc +
                    year.courses.reduce(
                      (courseAcc, course) =>
                        courseAcc + course.pastQuestions.length,
                      0
                    ),
                  0
                ),
              0
            ),
          0
        ),
      }));
    }

    if (currentPath.length === 1) {
      const university = mockUniversities.find(
        (uni) => uni.id === currentPath[0]
      );
      return (
        university?.faculties.map((faculty) => ({
          id: faculty.id,
          name: faculty.name,
          type: "faculty" as const,
          count: faculty.departments.reduce(
            (acc, dept) =>
              acc +
              dept.years.reduce(
                (yearAcc, year) =>
                  yearAcc +
                  year.courses.reduce(
                    (courseAcc, course) =>
                      courseAcc + course.pastQuestions.length,
                    0
                  ),
                0
              ),
            0
          ),
        })) || []
      );
    }

    if (currentPath.length === 2) {
      const university = mockUniversities.find(
        (uni) => uni.id === currentPath[0]
      );
      const faculty = university?.faculties.find(
        (fac) => fac.id === currentPath[1]
      );
      return (
        faculty?.departments.map((dept) => ({
          id: dept.id,
          name: dept.name,
          type: "department" as const,
          count: dept.years.reduce(
            (acc, year) =>
              acc +
              year.courses.reduce(
                (courseAcc, course) => courseAcc + course.pastQuestions.length,
                0
              ),
            0
          ),
        })) || []
      );
    }

    if (currentPath.length === 3) {
      const university = mockUniversities.find(
        (uni) => uni.id === currentPath[0]
      );
      const faculty = university?.faculties.find(
        (fac) => fac.id === currentPath[1]
      );
      const department = faculty?.departments.find(
        (dept) => dept.id === currentPath[2]
      );
      return (
        department?.years.map((year) => ({
          id: year.id,
          name: `${year.year}`,
          type: "year" as const,
          count: year.courses.reduce(
            (acc, course) => acc + course.pastQuestions.length,
            0
          ),
        })) || []
      );
    }

    if (currentPath.length === 4) {
      const university = mockUniversities.find(
        (uni) => uni.id === currentPath[0]
      );
      const faculty = university?.faculties.find(
        (fac) => fac.id === currentPath[1]
      );
      const department = faculty?.departments.find(
        (dept) => dept.id === currentPath[2]
      );
      const year = department?.years.find((y) => y.id === currentPath[3]);
      return (
        year?.courses.map((course) => ({
          id: course.id,
          name: `${course.courseCode} - ${course.title}`,
          type: "course" as const,
          count: course.pastQuestions.length,
        })) || []
      );
    }

    return [];
  };

  const navigate = (id: string, name: string, type: string) => {
    if (type === "course") {
      // Navigate to course view with past questions
      return;
    }

    const newPath = [...currentPath, id];
    const newBreadcrumbs = [...breadcrumbs, { name, path: newPath.join("/") }];

    setCurrentPath(newPath);
    setBreadcrumbs(newBreadcrumbs);
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === -1) {
      setCurrentPath([]);
      setBreadcrumbs([]);
    } else {
      const newPath = currentPath.slice(0, index + 1);
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setCurrentPath(newPath);
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  const currentData = getCurrentData();
  const filteredData = currentData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "university":
        return <BookOpen className="h-6 w-6 text-purple-400" />;
      case "faculty":
        return <Users className="h-6 w-6 text-cyan-400" />;
      case "department":
        return <FolderOpen className="h-6 w-6 text-pink-400" />;
      case "year":
        return <FileText className="h-6 w-6 text-green-400" />;
      case "course":
        return <BookOpen className="h-6 w-6 text-yellow-400" />;
      default:
        return <FolderOpen className="h-6 w-6 text-gray-400" />;
    }
  };

  const getCurrentTitle = () => {
    if (currentPath.length === 0) return "Universities";
    if (currentPath.length === 1) return "Faculties";
    if (currentPath.length === 2) return "Departments";
    if (currentPath.length === 3) return "Years";
    if (currentPath.length === 4) return "Courses";
    return "Explore";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {getCurrentTitle()}
            </h1>
            <p className="text-gray-600">
              Navigate through the academic structure to find past questions
            </p>
          </div>
          <Link
            to="/upload"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Upload Past Question</span>
          </Link>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 mb-6">
            <button
              onClick={() => navigateToBreadcrumb(-1)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Home
            </button>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <button
                  onClick={() => navigateToBreadcrumb(index)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Search */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${getCurrentTitle().toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.id, item.name, item.type)}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getIcon(item.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm capitalize">
                      {item.type}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">
                    {item.count}{" "}
                    {item.count === 1 ? "past question" : "past questions"}
                  </span>
                </div>

                {item.type === "course" && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200">
                    View Questions
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No {getCurrentTitle().toLowerCase()} found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? `No results found for "${searchTerm}"`
                : `No ${getCurrentTitle().toLowerCase()} available in this section`}
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              <span>Be the first to upload</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
