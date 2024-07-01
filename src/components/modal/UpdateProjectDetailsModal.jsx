import React, { useRef } from 'react';
import { TypeOfImage } from '../../utility/TypeOfImage';
import GenerateImage from '../../FatchAction/GenerateImage';
import toast from 'react-hot-toast';
import PatchAction from '../../FatchAction/PatchAction';

const UpdateProjectDetailsModal = ({projectDetailsData,refetch}) => {

    const feature=['Payment GetWay', 'Account Types'];
    const modalRef = useRef(null);
  
    const handleSubmit=async(e)=>{
        e.preventDefault();

        const form = e.target;
        const projecttype=form.projecttype.value;
        const statingTime=form.statingTime.value;
        const enddingTime=form.enddingTime.value;
        const feature=form.feature.value;
        const featureDiscription=form.featureDiscription.value;
        const responsiveDesign=form.responsiveDesign.value;
        const technologiesUsed=form.technologiesUsed.value;
        const imageFile=form.src.files[0] ;
        let src;
        if(form.src && form.src.files[0])
        {
            if(TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase())){

                src= await GenerateImage(imageFile);
             }
             else{
                 toast.error("Type not Match")
             }
        }
        else{
            
            src=projectDetailsData.src
         }

         PatchAction(`${process.env.REACT_APP_SERVER_URL}/projectdetails/${projectDetailsData._id}`,{
            projecttype,statingTime,enddingTime,feature,featureDiscription,responsiveDesign,technologiesUsed,src
        },refetch);
        form.reset();
        if (modalRef.current) {
            modalRef.current.close();
        }

        



    }
    return (
        <>
             <dialog id="projectdetails_modal" className="modal" ref={modalRef}>
        <div className="modal-box w-full bg-gradient-to-b from-black via-black to-gray-800">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
       
          <div className='max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full bg-gradient-to-b from-black via-black to-gray-800'>
      <form onSubmit={handleSubmit} className="shadow-md rounded px-10 pt-10 pb-10 mb-5">
        <h2 className="text-2xl mb-4">Add To Project Details</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="projecttype">
            Project Type
          </label>
          <input
            id="projecttype"
            name="projecttype"
            type="text"
             defaultValue={projectDetailsData.projecttype}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="statingTime">
            Stating Time/Date
          </label>
          <input
            id="statingTime"
            name="statingTime"
            type="date"
             defaultValue={projectDetailsData.statingTime}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="enddingTime">
            Ending Time/Date
          </label>
          <input
            id="enddingTime"
            name="enddingTime"
            type="date"
             defaultValue={projectDetailsData.enddingTime}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <select
            name="feature"

            className="select select-primary w-full max-w-full"
          >
          
            {/* Assuming feature is an array from your state or props */}
            <option className='text-white' disabled>Your Selected Feature {projectDetailsData.feature}</option>
            {feature?.map((v, index) => (
              <option key={index} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="featureDiscription">
            Feature Description
          </label>
          <textarea
            id="featureDiscription"
            name="featureDiscription"
             defaultValue={projectDetailsData.featureDiscription}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="responsiveDesign">
            Responsive Design
          </label>
          <textarea
            id="responsiveDesign"
            name="responsiveDesign"
             defaultValue={projectDetailsData.responsiveDesign}
           featureDiscription
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="technologiesUsed">
            Technologies Used
          </label>
          <textarea
            id="technologiesUsed"
            name="technologiesUsed"
             defaultValue={projectDetailsData.technologiesUsed}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
            Photo Images
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="src"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a Photo</span>
                  <input
                    id="src"
                    name="src"
                    type="file"
                    
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs">PNG, JPG, GIF up to 800kb</p>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add To Details
        </button>
      </form>
    </div>
       
        </div>
      </dialog>
        </>
    );
};

export default UpdateProjectDetailsModal;