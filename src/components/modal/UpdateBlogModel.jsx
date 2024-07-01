import React, { useRef } from 'react';
import { TypeOfImage } from '../../utility/TypeOfImage';
import toast from 'react-hot-toast';
import GenerateImage from '../../FatchAction/GenerateImage';
import PatchAction from '../../FatchAction/PatchAction';

const UpdateBlogModel = ({specificBlog,refetch}) => {


    const modalRef = useRef(null);

    const handelUpdateBlog=async(e)=>{

        e.preventDefault();
        const form = e.target;
        const title=form.title.value;
        const subjectname=form.subjectname.value;
        const content=form.content.value;
        const imageFile=form.photo.files[0] ;
        let photo;
           if(form.photo && form.photo.files[0])
            {
                if(TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase())){

                    photo= await GenerateImage(imageFile);
                 }
                 else{
                     toast.error("Type not Match")
                 } 

            }
            else{
                photo=specificBlog.photo;
            }
            console.log({title,content,photo,subjectname});
            PatchAction(`${process.env.REACT_APP_SERVER_URL}/blog/${specificBlog._id}`,{title,content,photo,subjectname},refetch);
            form.reset();
            if (modalRef.current) {
                modalRef.current.close();
            }

    }
    return (
        <>
              <dialog id="blog_modal" className="modal" ref={modalRef} >
        <div className="modal-box w-full bg-gradient-to-b from-black via-black to-gray-800">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
       
          <div className=' max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full '>
               <form onSubmit={handelUpdateBlog}  className=" shadow-md rounded px-10 pt-10 pb-10 mb-5">
        <h2 className="text-2xl mb-4">Update Blogs</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="">
         Blog Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={specificBlog.title}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline `}
          />
       
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="subjectname">
               Subject Name
          </label>
          <input
            id="subjectname"
            name="subjectname"
            type="text"
            defaultValue={specificBlog.subjectname}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline `}
          />
          
        </div>

        <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="content"
            >
            Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={specificBlog.content}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
           
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
                    htmlFor="photo"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a Photo</span>
                    <input
                      id="photo"
                      name="photo"
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
          Add To Project
        </button>
      </form>
        </div>
       
        </div>
      </dialog>
        </>
    );
};

export default UpdateBlogModel;