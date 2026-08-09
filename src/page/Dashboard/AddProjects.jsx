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
        <div className='max-w-screen-lg mx-auto p-4 sm:p-6 py-20 flex flex-col justify-center w-full text-white'>

            {/* terminal-style heading */}
            <div className="mb-10">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-violet-400/80 mb-3">
                // work
              </p>
              <h2 className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100">
                <span className="text-zinc-600">$</span> projects{" "}
                <span className="text-amber-300">--add</span>
                <span className="inline-block w-[10px] h-[1em] ml-2 -mb-1 bg-violet-400 animate-pulse" />
              </h2>
              <p className="mt-4 text-sm text-zinc-500 font-mono">
                Add a new entry to my project index
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm px-8 py-10 mb-5
                shadow-[0_0_60px_-15px_rgba(167,139,250,0.15)]"
            >
        <div className="mb-5">
          <label className="block text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2" htmlFor="demo">
           Project Live Url
          </label>
          <input
            id="demo"
            name="demo"
            type="text"
            {...register("demo", { required: "Demo is required" })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2.5 px-3.5 text-white
              placeholder:text-zinc-600 transition-colors
              focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
          />
        {errors.demo && <p className="text-red-400 text-xs font-mono mt-1.5">{errors.demo.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2" htmlFor="code">
                Client Site Github Link
          </label>
          <input
            id="code"
            name="code"
            type="text"
            {...register("code", { required: "Demo is required" })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2.5 px-3.5 text-white
              placeholder:text-zinc-600 transition-colors
              focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
          />
           {errors.code && <p className="text-red-400 text-xs font-mono mt-1.5">{errors.code.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2" htmlFor="server">
              Server Site Github Link
          </label>
          <input
            id="server"
            name="server"
            type="text"
            {...register("server", { required: "server is required" })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2.5 px-3.5 text-white
              placeholder:text-zinc-600 transition-colors
              focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
          />
         {errors.server && <p className="text-red-400 text-xs font-mono mt-1.5">{errors.server.message}</p>}
        </div>
      
        <div className="mb-6">
            <label
              className="block text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2"
              htmlFor="photo"
            >
              Photo Images
            </label>
            <div className="flex justify-center px-6 pt-8 pb-8 border-2 border-dashed border-zinc-700 rounded-xl
              bg-zinc-900/40 hover:border-violet-500/50 hover:bg-zinc-900/70 transition-colors">
              <div className="space-y-2 text-center">
                <svg
                  className="mx-auto h-10 w-10 text-zinc-600"
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
                <div className="flex justify-center text-sm text-zinc-500">
                  <label
                    htmlFor="src"
                    className="relative cursor-pointer font-medium text-violet-400 hover:text-violet-300
                      focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500/40 rounded"
                  >
                    <span>Upload a Photo</span>
                    <input
                      id="src"
                      name="src"
                      {...register("src", { required: "src is required" })}
                     
                      type="file"
                      className="sr-only"
                    />
                     {errors.src && <p className="text-red-400 text-xs font-mono mt-1.5">{errors.src.message}</p>}
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-zinc-600">PNG, JPG, GIF up to 800kb</p>
              </div>
            </div>
          </div>
        <button
          type="submit"
          className="w-full sm:w-auto font-mono text-sm px-5 py-2.5 rounded-lg border border-violet-500/40
            bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/60
            focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 transition-colors"
        >
          Add To Project
        </button>
      </form>
        </div>
    );
};

export default AddProjects;