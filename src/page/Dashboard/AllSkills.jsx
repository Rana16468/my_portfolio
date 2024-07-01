import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorPage from '../../components/ErrorPage';
import UpdateSkillsModal from '../../components/modal/UpdateSkillsModal';
import DeleteAction from '../../FatchAction/DeleteAction';
const AllSkills = () => {

    const [skillId,setSkillId]=useState({})

    const {
      data:allSkills = [],
      isLoading,
      error,
      refetch,
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

    //REACT_APP_SERVER_URL
   const handelDelete=(id)=>{
    if(id){
        DeleteAction(`${process.env.REACT_APP_SERVER_URL}/skill/${id}`,refetch);
    }
   }

   
    const skillModel = (skillId,src,title,style) => {
        document.getElementById("skill_modal").showModal();
        setSkillId({skillId,src,title,style});
      };


    return (
        <>
           
           
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
            Experience/Skills
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
              <div className="flex items-center justify-center">
                <button onClick={()=>skillModel(_id,src,title,style)}   className="w-1/2 px-6 py-3  m-4 duration-200 hover:scale-105">
                  Update
                </button>
                <UpdateSkillsModal skillId={skillId} refetch={refetch}/>
                {/* added to modal */}
                <button onClick={()=>handelDelete(_id)} className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
   

        </>
    );
};

export default AllSkills;