import React from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Users, FileText } from 'lucide-react';
import { mockCourses, getMaterialsWithDetails } from '../data/mockData';
import MaterialCard from '../components/MaterialCard';

const CourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = mockCourses.find(c => c.id === id);
  const allMaterials = getMaterialsWithDetails();
  const courseMaterials = allMaterials.filter(material => material.courseId === id);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-600">{course.courseCode}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <div className="space-y-2 text-gray-600">
              <p><strong>University:</strong> {course.university}</p>
              <p><strong>Department:</strong> {course.department}</p>
              <p><strong>Level:</strong> {course.level}00 Level</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 text-gray-500 mb-2">
              <FileText className="h-5 w-5" />
              <span>{courseMaterials.length} Materials</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="h-5 w-5" />
              <span>{new Set(courseMaterials.map(m => m.uploadedBy)).size} Contributors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Materials */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Materials</h2>
        
        {courseMaterials.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courseMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No materials available</h3>
            <p className="text-gray-600 mb-6">
              Be the first to share study materials for this course!
            </p>
            <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <span>Upload Material</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseView;