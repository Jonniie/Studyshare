import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  BookOpen,
  ThumbsUp,
  Award,
  Trophy,
  Star,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

interface UserQuestion {
  id: string;
  title: string;
  type: string;
  votes: number;
  createdAt: Date;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with actual API call when endpoint is available
  // Example API integration:
  // useEffect(() => {
  //   const fetchUserUploads = async () => {
  //     try {
  //       const response = await api.get('/user/uploads');
  //       setUserQuestions(response.data || []);
  //     } catch (error) {
  //       console.error('Error fetching user uploads:', error);
  //       setUserQuestions([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   if (user) {
  //     fetchUserUploads();
  //   }
  // }, [user]);

  // For now, we'll use placeholder data since we don't have the API endpoint yet
  useEffect(() => {
    // Simulate loading user's uploads
    setTimeout(() => {
      // Sample data to show how it would look with actual uploads
      // Remove this when you have the real API endpoint
      const sampleQuestions: UserQuestion[] = [
        {
          id: "1",
          title: "Data Structures and Algorithms Past Question 2023",
          type: "PDF",
          votes: 15,
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          title: "Computer Networks Final Exam 2022",
          type: "PDF",
          votes: 8,
          createdAt: new Date("2024-01-10"),
        },
      ];

      setUserQuestions(sampleQuestions); // Replace with [] when you want to show empty state
      setLoading(false);
    }, 1000);
  }, []);

  if (!user) return null;

  const totalVotes = userQuestions.reduce(
    (sum: number, question: UserQuestion) => sum + question.votes,
    0
  );

  const getContributorLevel = (votes: number) => {
    if (votes >= 100)
      return {
        level: "Diamond",
        color: "from-cyan-400 to-blue-500",
        icon: Trophy,
      };
    if (votes >= 50)
      return {
        level: "Gold",
        color: "from-yellow-400 to-orange-500",
        icon: Award,
      };
    if (votes >= 20)
      return {
        level: "Silver",
        color: "from-gray-300 to-gray-500",
        icon: Star,
      };
    return {
      level: "Bronze",
      color: "from-orange-400 to-red-500",
      icon: Award,
    };
  };

  const contributorInfo = getContributorLevel(totalVotes);
  const ContributorIcon = contributorInfo.icon;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
          <div className="flex-shrink-0 mb-6 sm:mb-0">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              <div
                className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r ${contributorInfo.color} rounded-full flex items-center justify-center border-4 border-gray-200/50`}
              >
                <ContributorIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {user.fullName}
            </h1>
            <p className="text-gray-600 text-xl mb-4">{user.university}</p>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>
                  Joined{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    year: "numeric",
                  }).format(user.createdAt)}
                </span>
              </div>
              <div
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${contributorInfo.color} rounded-full`}
              >
                <ContributorIcon className="h-4 w-4 text-white" />
                <span className="text-white font-medium">
                  {contributorInfo.level} Contributor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {userQuestions.length}
            </div>
            <div className="text-gray-600">Past Questions Uploaded</div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
              <ThumbsUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {totalVotes}
            </div>
            <div className="text-gray-600">Total Votes Received</div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${contributorInfo.color} rounded-full mb-4`}
            >
              <ContributorIcon className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {contributorInfo.level}
            </div>
            <div className="text-gray-600">Contributor Level</div>
          </div>
        </div>
      </div>

      {/* Uploaded Past Questions */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Uploads</h2>

        {userQuestions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userQuestions.map((question) => (
              <div key={question.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-indigo-100/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-white/50 backdrop-blur-md border border-gray-200/30 rounded-xl p-6 hover:bg-white/70 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {question.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }).format(question.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500 uppercase">
                        {question.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-800">
                        {question.votes}
                      </span>
                    </div>

                    <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-300">
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/50 backdrop-blur-md border border-gray-200/30 rounded-2xl p-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No past questions uploaded yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start sharing your knowledge by uploading your first past
                question.
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                <span>Upload Your First Past Question</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
