import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorPage from '../../components/ErrorPage';
import UpdateProjectDetailsModal from '../../components/modal/UpdateProjectDetailsModal';
import DeleteAction from '../../FatchAction/DeleteAction';


const ProjectDetails = () => {
  const { id } = useParams();
  const [projectDetailsData,setProjectDetailsData]=useState({});
  const {
    data: projectDetails = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projectDetails", id],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/projectdetails/${id}`, {
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage />;
  }

  

  
  const {
    _id,
    project,
    projecttype,
    statingTime,
    enddingTime,
    feature,
    
src:projectDetailsSrc,
    featureDiscription,
    responsiveDesign,
    technologiesUsed,
  } = projectDetails?.data || {};

  const { src, demo, code, server, createdAt }=project || {};
  
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) || "";


  const projectdetailsModal=()=>{

    document.getElementById("projectdetails_modal").showModal();
    setProjectDetailsData({ projecttype,
        statingTime,
        enddingTime,
        feature,
        src:projectDetailsSrc,
        featureDiscription,
        responsiveDesign,
        technologiesUsed,
        _id

    });
  }

 
  const handelDeleteProjectDetails=(id)=>{
    if(id){
        DeleteAction(`${process.env.REACT_APP_SERVER_URL}/projectdetails/${id}`,refetch);
    }

  }

  return (
    <>
      {!isLoading && (
        <div className='max-w-screen-lg mx-auto p-10 flex flex-col justify-center w-full bg-gradient-to-b from-black via-black to-gray-800'>
          <div className="flex justify-center items-center min-h-screen ">
            <div className="card w-full lg:w-full bg-base-100 shadow-xl m-4">
              <figure>
                <img src={src || "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt="Project" className="w-full h-auto" />
                <img src= {projectDetailsSrc || "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt="Project" className="w-full h-auto"/>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Web Development
                  <div className="badge badge-secondary ml-2">Featured</div>
                </h2>
                <p><strong>Project Types:</strong> {projecttype || ""}</p>
                <p><strong>Starting Time/Date:</strong> {statingTime || ""}</p>
                <p><strong>Ending Time/Date:</strong> {enddingTime || ""}</p>
                <p><strong>Important Feature:</strong> {feature || ""}</p>
                <p><strong>Feature:</strong> {feature || ""}</p>
                <p><strong>Description:</strong> {featureDiscription || ""}</p>
                <p><strong>Responsive Design:</strong> {responsiveDesign || ""}</p>
                <p><strong>Technologies Used:</strong> {technologiesUsed || ""}</p>
                <p><strong>Project Uploding Date </strong> { formattedDate || ""}</p>

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
                    <button disabled={projectDetails?.data?false:true} onClick={()=>projectdetailsModal()} className='btn btn-outline btn-primary btn-sm mr-3'>Update</button>
                    <UpdateProjectDetailsModal projectDetailsData={projectDetailsData} refetch={refetch}/>
                    <button disabled={projectDetails?.data?false:true} onClick={()=>handelDeleteProjectDetails(_id)}  className='btn btn-outline btn-error btn-sm'>Delete</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
