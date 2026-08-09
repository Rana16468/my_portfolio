import React, { useRef } from 'react';
import { TypeOfImage } from '../../utility/TypeOfImage';
import GenerateImage from '../../FatchAction/GenerateImage';
import toast from 'react-hot-toast';
import PatchAction from '../../FatchAction/PatchAction';



const UpdateSkillsModal = ({ skillId,refetch}) => {
    const style=['shadow-orange-500', 'shadow-blue-500', 'shadow-yellow-500',  'shadow-sky-400', 'shadow-gray-400' ]
    const modalRef = useRef(null);


    
    const handelSkillUpdate=async(e)=>{
        e.preventDefault();

        const form = e.target;
        const title=form.title.value;
        const style=form.style.value;
         let imageFile=form.src.files[0] ;
         let src;
         if(form.src && form.src.files[0]){
            if(TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase())){

               src= await GenerateImage(imageFile);
            }
            else{
                toast.error("Type not Match")
            }
           
         }
         else{
            
            src=skillId.src
         }

       

        PatchAction(`${process.env.REACT_APP_SERVER_URL}/skill/${skillId.skillId}`,{
            title,style,src
         },refetch);
         form.reset();
         if (modalRef.current) {
             modalRef.current.close();
         }
        
         

        

        
       


    }
    return (
        <>
        <dialog id="skill_modal" className="modal" ref={modalRef}>
        <div className="modal-box w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl p-0 overflow-hidden shadow-[0_0_60px_-15px_rgba(167,139,250,0.25)]">

          {/* terminal-style title bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <p className="font-mono text-xs text-zinc-500 tracking-wide">
                skill<span className="text-violet-400">.update()</span>
              </p>
            </div>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">
                ✕
              </button>
            </form>
          </div>

          <form onSubmit={handelSkillUpdate} className="px-8 py-8">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-violet-400/80 mb-1">
              UPDATE SKILL
            </p>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Add To My Skills</h2>

            <div className="mb-5">
              <label className="block text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2" htmlFor="title">
                Skill Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={skillId?.title}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2.5 px-3.5 text-white
                  placeholder:text-zinc-600 transition-colors
                  focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2">
                Card Style
              </label>
              <select
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2.5 px-3.5 text-white
                  transition-colors focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                name='style'
              >
                <option disabled selected value="">Style Slected</option>
                <option disabled>Your Selected Style :{skillId.style}</option>
                {
                    style.map((v,index)=><option key={index} value={v}>{v}</option>)
                }
              </select>
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
                          type="file"
                          className="sr-only"
                        />
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
              Update
            </button>
          </form>

        </div>
      </dialog>
        </>
    );
};

export default UpdateSkillsModal;