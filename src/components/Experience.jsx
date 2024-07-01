import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";
const Experience = () => {
 
  const {
    data:allSkills = [],
    isLoading,
    error,
 
  } = useQuery({
    queryKey: ["allSkills"],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/skill/`, {
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

  return (
    <div
      name="experience"
      className="bg-gradient-to-b from-gray-800 to-black w-full  pt-32 "
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
            Experience
          </p>
          <p className="py-6">These are the technologies I've worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0 mb-24">
          { !isLoading && allSkills?.data.map(({ _id, src, title, style }) => (
            <div
              key={_id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className="w-full mx-auto" />
              <p className="mt-4">{title}</p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
