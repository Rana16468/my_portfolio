import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const navigate=useNavigate();

  const onSubmit = async (values) => {
    if (values.password.length < 6) {
      toast.error("Password should be 6 characters or more.");
      return;
    }

    if (values?.password !== values?.confirmpassword) {
      toast.error("Your Password did not match");
      return;
    }

    const registerData = {
      username: values?.name,
      email: values?.email,
      password: values?.password,
    };
   
   
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/`,{
        method:"POST",
        headers: {
            "content-type": "application/json",
            authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(registerData),
    }).then((res)=>{
        if(!res.ok){
            throw new Error('API ERROR');
        }
        return res.json();
       }).then((data)=>{
             if(!!data){
            localStorage.removeItem("token");
            const token=localStorage.getItem("token");
              if(token===null)
                {
                    reset();
                  navigate("/login");
                }
                else{
                    toast.error("Password Not Matched");
                }
          
         }
    }).catch((error)=>{
        toast.error(error?.message);
    })

  };

  return (
    <>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 from-black via-black to-gray-800 justify-around items-center hidden">
          <div>
            <img
              className="rounded-lg border-red-900 w-full h-full"
              src="https://us.123rf.com/450wm/liudmylachuhunova/liudmylachuhunova2001/liudmylachuhunova200100286/138320305-dream-it-wish-it-do-it-words-on-a-modern-board-on-a-white-wooden-surface-top-view-overhead-from.jpg?ver=6"
              alt=".."
            ></img>
            <h1 className="text-white font-bold text-4xl font-sans">Create Admin Account</h1>
            <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>

        <div className="flex md:w-1/2 justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <h1 className="text-white font-bold text-2xl mb-1">Hello User!</h1>
            <p className="text-sm font-normal text-white mb-7">Welcome Back Our My Portfolio</p>
            <div className="flex items-center border-2 py-2 px-11 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-white"
                {...register("name", { required: "Name is required" })}
                type="text"
                name="name"
                id="name"
                placeholder="Full name"
                required
              />
              {errors.name && <p role="alert" className="text-white">Name field issues</p>}
            </div>

            <div className="flex items-center border-2 py-2 px-11 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
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
              <input
                className="pl-2 outline-none border-none text-white"
                {...register("email", { required: "Email is required" })}
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="flex items-center border-2 py-2 px-11 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-white"
                {...register("password", { required: "Password is required" })}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex items-center border-2 py-2 px-11 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-white"
                {...register("confirmpassword", { required: "Confirm password is required" })}
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button type="submit" className="block w-full hover:bg-blue-700 bg-indigo-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Admin Register</button>
            <span className="text-sm ml-2 text-blue-900 hover:text-blue-900 cursor-pointer">Forgot Password?</span>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAdmin;
