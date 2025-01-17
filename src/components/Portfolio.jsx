import React from "react";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
const Portfolio = () => {
 

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
    <div
      name="portfolio"
      className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen "
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8 mt-2 ">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Projects
          </p>
          <p className="py-6">Check out some of my work right here</p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {!isLoading &&
              allprojects?.data?.map(({ _id, src, demo, code, server }) => (
                <div key={_id} className='shadow-md shadow-gray-600 rounded-lg'>
                  <div className='w-full h-52 rounded overflow-hidden'>
                    <img src={src} alt='' className='w-full h-full object-cover' />
                  </div>
                  <div className='flex items-center justify-center'>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={demo}
                      className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 underline'
                    >
                      Demo
                    </a>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={code}
                      className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 underline'
                    >
                      Code
                    </a>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={server}
                      className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 underline'
                    >
                      Server
                    </a>
                  </div>

                 
                  <div className=' flex justify-center items-center'>
                  <Link
                      to={`/project_details/${_id}`}
                    
                      className='btn btn-outline btn-secondary btn-sm underline m-1'
                    >
                     Details
                    </Link>
                  </div>

                  
                </div>
                
              ))}
          </div>
      </div>
    </div>
  );
};

export default Portfolio;
