// SecondGithubRepo

import { useState } from 'react';
import { GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import ErrorPage from '../ErrorPage';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import CommonGitRepo from './CommonGitRepo';

export default function SecondGithubRepo() {
  const [activeTab, setActiveTab] = useState('repositories');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;

  const {
    data: secondgitrepo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["secondgitrepo"],
    queryFn: async () => {
      try {
        const res = await fetch(`https://api.github.com/users/sohelrana2250/repos`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        // This properly propagates the error to React Query's error state
        toast.error(`Failed to fetch repos: ${error?.message}`);
        throw error; // Important: Re-throw the error so React Query can catch it
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !secondgitrepo) {
    return <ErrorPage />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Safely handle repositories data
  const repos = Array.isArray(secondgitrepo) ? secondgitrepo : [];
  
  // Pagination logic - make sure we handle empty array case
  const totalPages = Math.max(1, Math.ceil(repos.length / reposPerPage));
  
  // Ensure current page is valid
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing pages
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GitBranch className="text-gray-400" size={24} />
            <h1 className="text-xl font-bold">GitHub</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <button className="flex items-center space-x-1 hover:text-white transition-colors">
              <span>Pull requests</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-white transition-colors">
              <span>Issues</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-white transition-colors">
              <span>Marketplace</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-white transition-colors">
              <span>Explore</span>
            </button>
          </div>
          <div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="font-medium text-white">R</span>
            </div>
          </div>
        </div>
      </header>

      {/* Repository Count Banner */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              <span className="text-gray-400">Repositories:</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {repos.length}
              </span>
            </h2>
            <div className="bg-gray-800 px-4 py-2 rounded-md border border-gray-700 shadow-lg">
              <span className="text-sm font-medium">
                Showing page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-4 border-b border-gray-700">
        <div className="flex overflow-x-auto">
          {['overview', 'repositories', 'projects', 'packages', 'stars'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 whitespace-nowrap font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Repository List */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {currentRepos.length > 0 ? (
            currentRepos.map((repoData, index) => (
              <div key={repoData.id} className="transform hover:scale-[1.01] transition-all duration-300">
                <CommonGitRepo 
                  repoData={repoData} 
                  index={index} 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  formatDate={formatDate}
                />
              </div>
            ))
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400">No repositories found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination - Only show if we have repos */}
      {repos.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-10 h-10 rounded-md ${
                currentPage === 1 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800 text-blue-400 hover:bg-gray-700 hover:text-blue-300'
              } transition-colors`}
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                // Show current page, first, last, and adjacent pages
                if (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                
                // Show ellipsis for gaps
                if (
                  (pageNum === 2 && currentPage > 3) ||
                  (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span
                      key={pageNum}
                      className="w-10 h-10 flex items-center justify-center text-gray-500"
                    >
                      ...
                    </span>
                  );
                }
                
                return null;
              })}
            </div>
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-10 h-10 rounded-md ${
                currentPage === totalPages 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800 text-blue-400 hover:bg-gray-700 hover:text-blue-300'
              } transition-colors`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <GitBranch className="text-gray-400" size={20} />
                <span className="text-gray-300 font-medium">GitHub Portfolio</span>
              </div>
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <a href="..." className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="..." className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="..." className="hover:text-blue-400 transition-colors">Security</a>
              <a href="..." className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}