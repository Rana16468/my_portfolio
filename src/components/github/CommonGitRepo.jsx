import { Calendar, Clock,  GitBranch, Star, Eye, BookOpen, ExternalLink } from 'lucide-react';
import React from 'react';

const CommonGitRepo = ({ repoData, index, formatDate }) => {
  // Generate random contribution levels for the contribution graph
  const generateContributionLevel = (index) => {
    // Create a pattern that looks more like real GitHub contributions
    // Some days with high activity, some moderate, many with none
    if (index % 7 === 3 || index % 11 === 0) return 3; // High activity
    if (index % 5 === 0 || index % 13 === 0) return 2; // Medium activity
    if (index % 3 === 0) return 1; // Low activity
    return 0; // No activity
  };
  
  // Generate random topics if none exist in repo data
  const getTopics = () => {
    if (repoData?.topics && repoData?.topics?.length > 0) return repoData?.topics;
    
    // Default topics based on common tech stacks
    const defaultTopics = ['javascript', 'react', 'nodejs', 'mongodb', 'express', 'tailwindcss', 'api', 'fullstack'];
    const randomTopics = [];
    const numTopics = Math?.floor(Math?.random() * 4) + 2; // 2-5 topics
    
    for (let i = 0; i < numTopics; i++) {
      const randomIndex = Math?.floor(Math?.random() * defaultTopics?.length);
      if (!randomTopics.includes(defaultTopics[randomIndex])) {
        randomTopics.push(defaultTopics[randomIndex]);
      }
    }
    
    return randomTopics;
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-blue-900/10">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <div className="flex-grow">
          <div className="flex items-start md:items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-md text-white shadow-lg">
              <BookOpen size={22} />
            </div>
            <a 
              href={repoData?.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 font-semibold text-xl hover:underline flex items-center gap-2 hover:text-blue-300 transition-colors group"
            >
              {repoData?.name}
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <span className="hidden md:inline-block text-xs font-medium px-3 py-1 rounded-full border border-gray-600 bg-gray-700/50 text-gray-300">
              {repoData.private ? 'Private' : 'Public'}
            </span>
          </div>
          
          <p className="text-gray-300 pl-1 mb-3 line-clamp-2">
            {repoData?.description || "An advanced project showcasing modern development practices and efficient code organization principles"}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${repoData?.language ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
            <span className="text-sm text-gray-300">{repoData?.language || 'JavaScript'}</span>
          </div>
          
          <div className="flex items-center gap-1 text-yellow-300">
            <Star size={16} />
            <span className="text-sm">{repoData?.stargazers_count}</span>
          </div>
          
          <div className="flex items-center gap-1 text-green-400">
            <GitBranch size={16} />
            <span className="text-sm">{repoData?.forks_count}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 text-purple-400">
            <Eye size={16} />
            <span className="text-sm">{repoData?.watchers_count || Math.floor(Math.random() * 10)}</span>
          </div>
        </div>
      </div>
      
      {/* Topics */}
      <div className="flex flex-wrap gap-2 mb-4">
        {getTopics()?.map((topic, i) => (
          <span 
            key={i} 
            className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-800/60 transition-colors cursor-pointer"
          >
            {topic}
          </span>
        ))}
      </div>
      
      {/* Dates and Stats Row */}
      <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-gray-300 mb-6 pl-1">
        <div className="flex items-center gap-2 hover:text-purple-400 transition-colors">
          <Calendar size={16} className="text-purple-400" />
          <span>Created: {formatDate(repoData?.created_at)}</span>
        </div>
        <div className="flex items-center gap-2 hover:text-pink-400 transition-colors">
          <Clock size={16} className="text-pink-400" />
          <span>Updated: {formatDate(repoData?.updated_at)}</span>
        </div>
      </div>
      
      {/* Contribution Graph */}
      <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800 mt-4">
        <h4 className="text-sm text-gray-400 mb-3">Recent contribution activity</h4>
        <div className="grid grid-cols-12 md:grid-cols-16 lg:grid-cols-24 gap-1">
        {Array.from({ length: 96 }).map((_, index) => {
          const level = generateContributionLevel(index);
          const bgColor = 
            level === 3 ? 'bg-emerald-500 hover:bg-emerald-400' :
            level === 2 ? 'bg-emerald-600 hover:bg-emerald-500' :
            level === 1 ? 'bg-emerald-700 hover:bg-emerald-600' :
            'bg-gray-800 hover:bg-gray-700';
          
          return (
            <div
              key={index}
              className={`w-full aspect-square rounded-sm transform hover:scale-125 transition-all duration-200 cursor-pointer ${bgColor}`}
              style={{ height: '8px', width: '8px' }}
              title={`${level} contributions on day ${index + 1}`}
            />
          );
        })}
      </div>
      
        <div className="flex justify-end mt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Less</span>
            <div className="w-2 h-2 bg-gray-800 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-700 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
            <span>More</span>
          </div>
        </div>
      </div>
      
      {/* View button */}
      <div className="mt-6 flex justify-end">
        <a
          href={repoData?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 font-medium shadow-lg shadow-blue-900/20 transition-all duration-300 transform hover:scale-105"
        >
          <GitBranch size={16} />
          <span>View Repository</span>
        </a>
      </div>
    </div>
  );
};

export default CommonGitRepo;