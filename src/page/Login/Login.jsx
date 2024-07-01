import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  useForm } from "react-hook-form";
import toast from 'react-hot-toast';
const Login = () => {

    const { handleSubmit, register, reset ,formState:{errors}} = useForm();
    const [responeError,setError]=useState();
    const navigate=useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/dashboard/";

    const onSubmit=async (values)=>{

        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body:JSON.stringify(values)

        }).then((res)=>{
            if(!res.ok){
                throw new Error('API ERROR');
            }
            return res.json();
        }).then((data)=>{
            if(data.success){
                localStorage.setItem("token",data?.data?.accessToken);
                toast.success(data?.message);
                navigate(from, { replace: true });
               
                reset();
            }
        }).catch((error)=>{
            setError(error?.message);
            toast.error(error?.message);
        })

       
    }
    return (
        <>

<section className="relative flex flex-wrap lg:h-screen lg:items-center w-full bg-gradient-to-b from-black via-black to-gray-800">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

      <p className="mt-4 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
        ipsa culpa autem, at itaque nostrum!
      </p>
    </div>

    <form  onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            {...register("email", { required: "Email Address is required" })}  required
          />
           {errors.email && <p role="alert">Email Field Issues</p>}
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            {...register("password", { required: "Password is Required" })}
              required
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          No account?
          <Link  className="underline" href='/register'>Sign up</Link>
        </p>

        <button
          type="submit"
          className=" inline-block rounded-lg btn btn-outline btn-sm  via-white to-gray-900  text-sm font-medium text-white"
        >
          Sign in
        </button>
      </div>
    </form>
    {
      responeError && <>
       <p style={{backgroundColor:"red",padding:"1px",borderRadius:"2px", color:"white",marginTop:"5px"}}>User Not Exist {responeError}</p>
      </>
    }
  </div>

  <div className="relative  w-full sm:h-96 lg:h-full lg:w-1/2 h-screen">
    <img
      alt="..."
      src="https://enwpgo.files.wordpress.com/2023/02/web-design-portfolio-header.jpg"
      className="absolute inset-0 h-full w-full object-cover"
     
    />
  </div>
</section>
        </>
    );
};

export default Login;