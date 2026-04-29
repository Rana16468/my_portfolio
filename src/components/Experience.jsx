import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";

const Experience = () => {
  const {
    data: allSkills = [],
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
        toast.error(`Failed to fetch skills: ${error?.message}`);
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
      name="experience"
      className="bg-gradient-to-br from-gray-900 via-black to-blue-800 text-white w-full pt-20"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div className="text-center mb-12">
          <p className="text-5xl font-bold p-2 inline relative">
            Experience
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-yellow-500"></span>
          </p>
          <p className="py-6 text-lg text-indigo-200">
            Technologies I've mastered along my journey
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center py-8 px-4 sm:px-0 mb-24">
          {!isLoading &&
            allSkills?.data.map(({ _id, src, title, style }) => (
              <div
                key={_id}
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 border border-gray-800"
              >
                <div className="bg-opacity-30 bg-white p-4 rounded-lg mb-3">
                  <img
                    src={src}
                    alt={title}
                    className="w-full h-full object-contain mx-auto"
                  />
                </div>
                <p className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {title}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;