import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);
  if(!hoveredId){

  }

  const {
    data: allprojects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['allprojects'],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/project/`, {
          method: 'GET',
          headers: {
            authorization: `${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res?.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch projects: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div
      name="project"
      className="min-h-screen  bg-gradient-to-br from-gray-900 via-black to-blue-800 overflow-hidden text-white py-16"
    >
      <div className="max-w-screen-xl p-4 mx-auto">
        {/* Header Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold inline-block relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
              Projects
            </span>
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-400 rounded-full"></span>
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of projects showcasing my skills and expertise in web development
          </p>
        </motion.div>

        {/* Filter Buttons (Optional Enhancement) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-6 py-2 rounded-full bg-pink-600 text-white font-medium transition-all hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-600/20">
            All Projects
          </button>
          <button className="px-6 py-2 rounded-full bg-indigo-800/60 text-gray-200 font-medium transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20">
            Frontend
          </button>
          <button className="px-6 py-2 rounded-full bg-indigo-800/60 text-gray-200 font-medium transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20">
            Full Stack
          </button>
          <button className="px-6 py-2 rounded-full bg-indigo-800/60 text-gray-200 font-medium transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20">
            Mobile
          </button>
        </div>

        {/* Projects Grid with Animation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading &&
            allprojects?.data?.map(({ _id, src, demo, code, server }, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={_id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-purple-500/20"
                onMouseEnter={() => setHoveredId(_id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container with Overlay */}
                <div className="relative w-full h-60 overflow-hidden group">
                  <img 
                    src={src} 
                    alt="Project Preview" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Overlay that appears on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4`}>
                    <Link
                      to={`/project_details/${_id}`}
                      className="text-white font-bold text-lg hover:text-pink-400 transition-colors"
                    >
                      View Details
                    </Link>
                    <p className="text-gray-300 text-sm mt-1">Click to explore this project</p>
                  </div>
                </div>

                {/* Project Links */}
                <div className="p-5">
                  
                
                  {/* Links Container */}
                  <div className="flex items-center justify-between mt-4">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={demo}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 rounded-lg text-white text-sm font-medium transition-all hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-600/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Demo
                    </a>
                    
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={code}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-white text-sm font-medium transition-all hover:bg-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Code
                    </a>

                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={server}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-white text-sm font-medium transition-all hover:bg-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2h-14z" />
                      </svg>
                      Server
                    </a>
                  </div>

                  {/* Details Button */}
                  <Link
                    to={`/project_details/${_id}`}
                    className="mt-5 block w-full py-3 text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    View Project Details
                  </Link>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Empty State - Display when no projects */}
        {!isLoading && allprojects?.data?.length === 0 && (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-300">No Projects Found</h3>
            <p className="mt-2 text-gray-400">Start adding projects to showcase your portfolio.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;