import React from 'react';
import { useForm } from "react-hook-form";
import { TypeOfImage } from '../../utility/TypeOfImage';
import toast from 'react-hot-toast';
import GenerateImage from '../../FatchAction/GenerateImage';
import PostAction from '../../FatchAction/PostAction';

const AddToSkills = () => {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const style=['shadow-orange-500', 'shadow-blue-500', 'shadow-yellow-500',  'shadow-sky-400', 'shadow-gray-400' ]

    const onSubmit = async(data) => {
      const imageFile=data.src[0];
      if( TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase())){
         const src=await GenerateImage(imageFile);
         data.src=src;
        
         PostAction(`${process.env.REACT_APP_SERVER_URL}/skill/`,data);
         reset();
      }
      else{
       toast.error("No image file selected");
      }
    };
    return (
        <>
              <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className=" max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full bg-gradient-to-b from-black via-black to-gray-800">
        <h2 className="text-2xl mb-4">Add To My Skills</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="event">
        Skill Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            {...register("title", { required: "Event is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${errors.event ? "border-red-500" : ""}`}
          />
          {errors.event && <p className="text-red-500 text-xs italic">{errors.event.message}</p>}
        </div>
        <div className='mb-4'>
          <select {...register("style", { required: "Please select a Style" })} className="select select-primary w-full max-w-full">
            <option disabled selected value="">Style Slected</option>
            {
                style.map((v,index)=><option key={index} value={v}>{v}</option>)
            }
          </select>
          {errors.show && <p className="text-red-500 text-xs italic">{errors.show.message}</p>}
        </div>
        <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="src"
            >
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
                      {...register("src", { required: "src is required" })}
                     
                      type="file"
                      className="sr-only"
                    />
                     {errors.src && <p className="text-red-500 text-xs italic">{errors.src.message}</p>}
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs">PNG, JPG, GIF up to 800kb</p>
              </div>
            </div>
          </div>
        <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
        </>
    );
};

export default AddToSkills;