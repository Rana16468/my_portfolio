import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ErrorPage from './ErrorPage';

const HomeProjectDetails = () => {
    const { id } = useParams();
    const {
        data: projectDetails = {},
        isLoading,
        error,
      
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
    return (
        <>
     
                {!isLoading && (
        <div  name="project_details" className='max-w-screen-lg mx-auto p-10 flex flex-col justify-center w-full bg-gradient-to-b from-black via-black to-gray-800'>
          <div className="flex justify-center items-center min-h-screen ">
            <div className="card w-full lg:w-full bg-base-100 shadow-xl m-4">
            <figure className="flex justify-center items-center space-x-4">
  <img
    src={src || "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"}
    alt="Project"
    className="w-full h-full max-w-xs max-h-xs object-cover"
  />
  <img
    src={projectDetailsSrc || "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"}
    alt="Project"
    className="w-full h-full max-w-xs max-h-xs object-cover"
  />
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
                    <Link to="/" className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 underline'>
                      Home
                    </Link>
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
    );
};

export default HomeProjectDetails;