import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import ErrorPage from './ErrorPage';

const MyBlog = () => {
  const { data: allblogs = [], isLoading, error } = useQuery({
    queryKey: ["allblogs"],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/`, {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch blogs: ${error?.message}`);
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
    <div name="blogs" className="min-h-screen bg-gradient-to-br  from-gray-900 via-black to-blue-800 py-12">
      <div className="max-w-screen-xl mx-auto p-6 flex flex-col justify-center w-full text-white">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold inline-block px-4 py-2 border-b-4 border-emerald-400 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
            My Blog Collection
          </h1>
          <p className="mt-6 text-xl text-cyan-100 max-w-2xl mx-auto">
            Exploring technology, design, and innovation through my personal journey
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {!isLoading && allblogs?.data?.map((blog, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-2xl">
              <div className="overflow-hidden h-64">
                <img 
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" 
                  src={blog.photo} 
                  alt={blog.title} 
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-emerald-500 text-emerald-100 px-3 py-1 rounded-full text-sm font-medium">
                    {blog.subjectname}
                  </span>
                  <span className="text-cyan-300 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                  {blog.title}
                </h2>
                
                <div className="text-gray-300 mb-6 line-clamp-3 text-sm">
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                
                <div className="flex items-center mt-6 border-t border-indigo-700 pt-4">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-12 w-12 rounded-full border-2 border-emerald-400" 
                      src="https://randomuser.me/api/portraits/men/1.jpg" 
                      alt="A M Sohel Rana" 
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">A M Sohel Rana</p>
                    <a 
                      href="http://example.com/profile" 
                      className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Profile
                    </a>
                  </div>
                  
                  <a 
                    href="https://www.linkedin.com/in/ali-mohammad-sohel-rana-377050216/" 
                    className="ml-auto bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 text-sm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlog;