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
        toast.error(`Failed to fetch reviews: ${error?.message}`);
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
    <div name="blogs" className='w-full h-full bg-gradient-to-b from-black via-black to-gray-800 '>
         <br /><br />
       <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
            My Blogs
          </p>
          <p className="py-6">These are the  Blogs I've worked with This Techonogys</p>
        </div>
        <section className="px-5 py-10 dark:text-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 md:grid-cols-2  sm:grid-cols-1 gap-6">
            {!isLoading && allblogs?.data?.map((blog, index) => (
              <div key={index} className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <img className="w-full h-60  object-cover transform transition-transform duration-400 hover:scale-110" src={blog.photo} alt={blog._id} />
                <div className="p-4">
                  <h2 className="text-white text-lg font-semibold">Title: {blog.title}</h2>
                  <p className="mt-2 text-gray-400">Topic Name: {blog.subjectname}</p>
                  <p className="mt-2 text-gray-300">{blog.content.slice(0,150)+'....'}</p>
                  <p className="text-gray-400 text-sm mt-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
                 
                  
               
                 <div className="flex items-center mt-4">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Author" />
                    </div>
                    <div className="ml-3">
                      <p className="text-white text-sm font-semibold">A M Sohel Rana</p>
                      <a href="http://example.com/images/javascript-closures.png" className="text-blue-500 text-xs" target="_blank" rel="noopener noreferrer">
                        View Profile
                      </a>
                    </div>
                  </div>
                  
                  <a href="https://www.linkedin.com/in/ali-mohammad-sohel-rana-377050216/" className="block  bg-blue-900 hover:bg-blue-700 text-white font-semibold text-center mt-4 py-2 px-4 rounded" target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                 </div>
                </div>
              
            ))}
          </div>
        </div>
      </section>
        </div>
     
    </div>
  );
};

export default MyBlog;
