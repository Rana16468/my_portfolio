import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorPage from '../../components/ErrorPage';
import { Link } from 'react-router-dom';
import UpdateProjectModal from '../../components/modal/UpdateProjectModal';
import DeleteAction from '../../FatchAction/DeleteAction';

const AllProjects = () => {

    const [updateProject,setUpdateProject]=useState({});
  const {
    data: allprojects = [],
    isLoading,
    error,
    refetch,
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

  const projectModel=(project)=>{

    document.getElementById("project_modal").showModal();
   setUpdateProject(project)

  }
  const handelDeleteProject=(id)=>{

    if(id){
        DeleteAction(`${process.env.REACT_APP_SERVER_URL}/project/${id}`,refetch);

    }
  }
  return (
    <>
      
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div>
          <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
            Projects
          </p>
          <p className="py-6">Check out some of my work right here</p>
        </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
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

                  <div className='flex items-center justify-center ' >
                 
                    <Link
                       to={`/dashboard/project_details/${_id}`}
                    
                      className='btn btn-outline btn-sm underline m-1'
                    >
                      Details
                    </Link>
                   

                    <button onClick={()=>projectModel({_id,src,demo,code,server})} className='btn btn-outline btn-primary btn-sm underline m-1'>
                      Update
                    </button>
                    <UpdateProjectModal updateProject={updateProject} refetch={refetch}/>

                    

                    <button onClick={()=>handelDeleteProject(_id)} className='btn btn-outline btn-sm btn-error underline m-1'>
                      delete
                    </button>
                   
                  </div>
                  <div className=' flex justify-center items-center'>
                  <Link
                       to={`/dashboard/add_to_details/${_id}`}
                    
                      className='btn btn-outline btn-secondary btn-sm underline m-1'
                    >
                     Add To Details
                    </Link>
                  </div>

                  
                </div>
                
              ))}
          </div>
        </div>
    
    </>
  );
};

export default AllProjects;
