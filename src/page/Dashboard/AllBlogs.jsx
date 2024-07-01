import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorPage from '../../components/ErrorPage';
import { convertToDays } from '../../utility/CovertsDays';
import UpdateBlogModel from '../../components/modal/UpdateBlogModel';
import DeleteAction from '../../FatchAction/DeleteAction';

const AllBlogs = () => {

  const [specificBlog,setSpecificBlog]=useState({});

    const {
        data:allblogs = [],
        isLoading,
        error,
        refetch,
      } = useQuery({
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
            const data = await res?.json();
            return data;
          } catch (error) {
            toast.error(`Failed to fetch reviews: ${error?.message}`);
          }
        },
      });
  
      if(isLoading){
          return <LoadingSpinner/>
      }
      if(error){
          return <ErrorPage/>
      }
     
      const blogModal=(blog)=>{

        document.getElementById("blog_modal").showModal();
        setSpecificBlog(blog);
      }

      const handelDeleteBlog=(id)=>{

        if(id){
          DeleteAction(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`,refetch);
        }
      }

     
    return (
        <>
           
           <section className="px-5 py-10 dark:text-white">
  <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
    <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
      <div className="flex flex-col space-y-8 md:space-y-12">
        <div className="flex flex-col space-y-2">
          <h3 className="flex items-center space-x-2 dark:text-gray-300">
            <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
            <span className="text-xs font-bold tracking-wider uppercase">
              Exclusive
            </span>
          </h3>
          <a
            rel="noopener noreferrer"
            href="..."
            className="font-serif hover:underline text-white"
          >
            Donec sed elit quis odio mollis dignissim eget et nulla.
          </a>
          <p className="text-xs dark:text-gray-300">
            47 minutes ago by
            <a
              rel="noopener noreferrer"
              href="..."
              className="hover:underline dark:text-violet-600"
            >
              Leroy Jenkins
            </a>
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="flex items-center space-x-2 dark:text-gray-300">
            <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
            <span className="text-xs font-bold tracking-wider uppercase">
              Exclusive
            </span>
          </h3>
          <a
            rel="noopener noreferrer"
            href="..."
            className="font-serif hover:underline text-white"
          >
            Ut fermentum nunc quis ipsum laoreet condimentum.
          </a>
          <p className="text-xs dark:text-gray-300">
            2 hours ago by
            <a
              rel="noopener noreferrer"
              href="..."
              className="hover:underline dark:text-violet-600"
            >
              Leroy Jenkins
            </a>
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="flex items-center space-x-2 dark:text-gray-300">
            <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
            <span className="text-xs font-bold tracking-wider uppercase">
              Exclusive
            </span>
          </h3>
          <a
            rel="noopener noreferrer"
            href="..."
            className="font-serif hover:underline text-white"
          >
            Nunc nec ipsum lobortis, pulvinar neque sed.
          </a>
          <p className="text-xs dark:text-gray-300">
            4 hours ago by
            <a
              rel="noopener noreferrer"
              href="..."
              className="hover:underline dark:text-violet-600"
            >
              Leroy Jenkins
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex w-full h-1 bg-opacity-10 dark:bg-violet-600">
          <div className="w-1/2 h-full dark:bg-violet-600"></div>
        </div>
        <a
          rel="noopener noreferrer"
          href="..."
          className="flex items-center justify-between w-full text-white"
        >
          <span className="text-xs font-bold tracking-wider uppercase">
            See more exclusives
          </span>
          <svg
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 strokeCurrent dark:text-violet-600"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
    <div className="col-span-12 bg-center bg-no-repeat bg-cover xl:col-span-6 lg:col-span-5 md:col-span-9">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="grid grid-cols-1 gap-2">
            {! isLoading && allblogs?.data?.map((blog, index) => (
              <div
                key={index}
                className="w-full bg-gray-900 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  className="w-full object-cover object-center"
                  src={blog.photo}
                  alt={blog._id}
                />
                <div className="p-4">
                  <h2 className="text-white text-lg font-semibold">
                  Title:  {blog.title}
                  </h2>
                  <p className="mt-2 text-gray-400">Topic Name : {blog.subjectname}</p>
                  <p>{blog.content}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {blog.createdAt}
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="Author"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-white text-sm font-semibold">
                        A M Sohel Rana
                      </p>
                      <a
                        href="http://example.com/images/javascript-closures.png"
                        className="text-blue-500 text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                 
                  <a
                    href="https://www.linkedin.com/in/ali-mohammad-sohel-rana-377050216/"
                    className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold text-center mt-4 py-2 px-4 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>

                </div>

              
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
      <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
        <button
          type="button"
          className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-violet-600 text-white"
        >
          Latest
        </button>
        <button
          type="button"
          className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-gray-600 text-white"
        >
          Popular
        </button>
      </div>
      <div className="flex flex-col divide-y dark:divide-gray-600">
        {!isLoading && allblogs?.data?.map((v, index) => (
          <div key={index} className="flex px-1 py-4">
            <img
              alt=""
              className="flex-shrink-0 object-cover w-24 h-28 mr-4 dark:bg-gray-500"
              src={v.photo}
            />
            <div className="flex flex-col flex-grow">
              <a
                rel="noopener noreferrer"
                href="..."
                className="font-serif hover:underline text-white"
              >
                {v.title}
              </a>
              <p className="mt-auto text-xs dark:text-gray-300">
                {convertToDays(v.createdAt)}
                <a
                  rel="noopener noreferrer"
                  href="..."
                  className="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline"
                >
                  {v.subjectname}
                </a>
               
              </p>
               <div className='flex justify-center'>
                   <button onClick={()=>blogModal(v)} className='hover:bg-blue-900 underline btn-sm rounded' >Update </button>
                   <UpdateBlogModel specificBlog={specificBlog} refetch={refetch}/>
                   <button onClick={()=>handelDeleteBlog(v._id)} className='hover:bg-red-900 underline btn-sm rounded' >Delete </button>
               </div>
              

            </div>
           
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


        </>
    );
};

export default AllBlogs;