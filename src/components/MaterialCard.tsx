import React from 'react';
import { FileText, Download, ThumbsUp, User, Calendar } from 'lucide-react';
import { Material, Course, User as UserType } from '../types';

interface MaterialCardProps {
  material: Material & { course: Course; uploader: UserType };
  onVote?: (materialId: string) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onVote }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span className="font-medium text-blue-600">
              {material.course.courseCode} - {material.course.title}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{material.uploader.fullName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(material.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {getFileIcon(material.type)}
          <span className="text-xs text-gray-500 uppercase">{material.type}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {material.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onVote?.(material.id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm font-medium">{material.votes}</span>
          </button>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;