import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";
import SecondGithubRepo from "./github/SecondGithubRepo";

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
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/projectdetails/${id}`,
          {
            method: "GET",
            headers: {
              authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
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

    src: projectDetailsSrc,
    featureDiscription,
    responsiveDesign,
    technologiesUsed,
  } = projectDetails?.data || {};

  const { src, demo, code, server, createdAt } = project || {};

  const formattedDate =
    new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) || "";
  return (
    <>
      <div className="w-full bg-gradient-to-br from-gray-900 via-black to-blue-800 min-h-screen">
        {!isLoading && (
          <div
            name="project_details"
            className="max-w-screen-lg mx-auto p-4 sm:p-6 md:p-10 flex flex-col justify-center">
            <div className="flex justify-center items-center min-h-screen py-8">
              <div className="card w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl m-2 sm:m-4 rounded-xl overflow-hidden border border-purple-500">
                <figure className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-black bg-opacity-60">
                  <img
                    src={
                      src ||
                      "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    }
                    alt="Project"
                    className="w-full sm:w-1/2 h-48 sm:h-64 max-w-xs object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                  />
                  <img
                    src={
                      projectDetailsSrc ||
                      "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    }
                    alt="Project"
                    className="w-full sm:w-1/2 h-48 sm:h-64 max-w-xs object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                  />
                </figure>

                <div className="card-body bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl p-4 sm:p-6">
                  <h2 className="card-title text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex flex-wrap items-center">
                    <span className="mr-2">Web Development</span>
                    <div className="badge bg-gradient-to-r from-amber-500 to-pink-500 text-white border-0 animate-pulse text-xs sm:text-sm">
                      Featured
                    </div>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
                    <p className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-inner border-l-4 border-blue-500 text-sm sm:text-base">
                      <strong className="text-blue-400">Project Types:</strong>{" "}
                      <span className="text-gray-200">{projecttype || ""}</span>
                    </p>
                    <p className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-inner border-l-4 border-green-500 text-sm sm:text-base">
                      <strong className="text-green-400">
                        Starting Time/Date:
                      </strong>{" "}
                      <span className="text-gray-200">{statingTime || ""}</span>
                    </p>
                    <p className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-inner border-l-4 border-red-500 text-sm sm:text-base">
                      <strong className="text-red-400">
                        Ending Time/Date:
                      </strong>{" "}
                      <span className="text-gray-200">{enddingTime || ""}</span>
                    </p>
                    <p className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-inner border-l-4 border-purple-500 text-sm sm:text-base">
                      <strong className="text-purple-400">
                        Important Feature:
                      </strong>{" "}
                      <span className="text-gray-200">{feature || ""}</span>
                    </p>
                    <p className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-inner border-l-4 border-indigo-500 text-sm sm:text-base">
                      <strong className="text-indigo-400">Feature:</strong>{" "}
                      <span className="text-gray-200">{feature || ""}</span>
                    </p>
                    <p className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-inner border-l-4 border-yellow-500 text-sm sm:text-base">
                      <strong className="text-yellow-400">
                        Project Uploading Date:
                      </strong>{" "}
                      <span className="text-gray-200">
                        {formattedDate || ""}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-inner border-l-4 border-pink-500 text-sm sm:text-base">
                    <p>
                      <strong className="text-pink-400">Description:</strong>{" "}
                      <span className="text-gray-200">
                        {featureDiscription || ""}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-inner border-l-4 border-teal-500 text-sm sm:text-base">
                    <p>
                      <strong className="text-teal-400">
                        Responsive Design:
                      </strong>{" "}
                      <span className="text-gray-200">
                        {responsiveDesign || ""}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-inner border-l-4 border-cyan-500 text-sm sm:text-base">
                    <p>
                      <strong className="text-cyan-400">
                        Technologies Used:
                      </strong>{" "}
                      <span className="text-gray-200">
                        {technologiesUsed || ""}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center mt-6 gap-2 sm:gap-4">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={demo}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white text-center shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 text-sm sm:text-base w-full xs:w-auto sm:w-auto">
                      Demo
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={code}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-bold text-white text-center shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 text-sm sm:text-base w-full xs:w-auto sm:w-auto">
                      Code
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={server}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-full font-bold text-white text-center shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 text-sm sm:text-base w-full xs:w-auto sm:w-auto">
                      Server
                    </a>
                    <Link
                      to="/"
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full font-bold text-white text-center shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 text-sm sm:text-base w-full xs:w-auto sm:w-auto">
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <SecondGithubRepo />
          </div>
        )}


      </div>

      
    </>
  );
};

export default HomeProjectDetails;
