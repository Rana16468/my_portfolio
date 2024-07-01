import React from 'react';
import { useForm } from "react-hook-form";
import { TypeOfImage } from '../../utility/TypeOfImage';
import GenerateImage from '../../FatchAction/GenerateImage';
import PostAction from '../../FatchAction/PostAction';
import toast from 'react-hot-toast';

const AddProjects = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = async(data)=>{
        const imageFile=data.src[0];
        if( TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase()))
            {
                const src=await GenerateImage(imageFile);
                data.src=src;
                PostAction(`${process.env.REACT_APP_SERVER_URL}/project/`,data);
                reset();
            }
            else{
            toast.error("No image file selected");
            }
    }
    return (
        <div className=' max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full bg-gradient-to-b from-black via-black to-gray-800'>
               <form onSubmit={handleSubmit(onSubmit)} className=" shadow-md rounded px-10 pt-10 pb-10 mb-5">
        <h2 className="text-2xl mb-4">Add To My Project</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="">
           Project Live Url
          </label>
          <input
            id="demo"
            name="demo"
            type="text"
            {...register("demo", { required: "Demo is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline `}
          />
        {errors.demo && <p className="text-red-500 text-xs italic">{errors.demo.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="code">
                Client Site Github Link
          </label>
          <input
            id="code"
            name="code"
            type="text"
            {...register("code", { required: "Demo is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline `}
          />
           {errors.code && <p className="text-red-500 text-xs italic">{errors.code.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="server">
              Server Site Github Link
          </label>
          <input
            id="server"
            name="server"
            type="text"
            {...register("server", { required: "server is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline `}
          />
         {errors.server && <p className="text-red-500 text-xs italic">{errors.server.message}</p>}
        </div>
      
        <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
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
        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add To Project
        </button>
      </form>
        </div>
    );
};

export default AddProjects;