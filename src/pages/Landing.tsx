import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Share2,
  Search,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
} from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                StudyShare
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-gray-700 text-sm font-medium">
              Trusted by 10,000+ students
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Share & Access
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent block">
              Past Questions
            </span>
            from Any University
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with students across Nigeria and beyond. Upload, discover,
            and download high-quality past questions organized by university,
            faculty, and department.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/register"
              className="group relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>Start Exploring Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/login"
              className="group bg-white/60 backdrop-blur-md border border-gray-200/50 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/80 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <span>Sign In</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything you need to excel academically
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            StudyShare provides a comprehensive platform for students to
            collaborate and share knowledge
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Organized Structure
              </h3>
              <p className="text-gray-600">
                Navigate through universities, faculties, departments, and years
                to find exactly what you need
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Smart Discovery
              </h3>
              <p className="text-gray-600">
                Find relevant past questions using our advanced search and
                filtering system
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Join a growing community of students helping each other succeed
                academically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Trusted by students nationwide
              </h2>
              <p className="text-gray-600 text-lg">
                Join thousands of students already using StudyShare
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  10,000+
                </div>
                <div className="text-gray-600">Students</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  5+
                </div>
                <div className="text-gray-600">Universities</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  25,000+
                </div>
                <div className="text-gray-600">Past Questions</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  4.8
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12 text-center">
            <Zap className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Ready to boost your academic success?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join StudyShare today and get access to thousands of past
              questions from top universities
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Start Sharing Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">StudyShare</span>
          </div>
          <div className="text-center text-gray-600">
            <p>
              &copy; 2025 StudyShare. Empowering students across Nigeria and
              beyond.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
