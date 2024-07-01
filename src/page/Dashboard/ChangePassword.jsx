import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate=useNavigate();

  // password change
  const onSubmit = async (values) => {
  

    if (values.newPassword.length < 6) {
      toast.error("Min 6 Digit Password Needed");
      return;
    }

    if (values.newPassword !== values?.confirmpassword) {
      toast.error("Password Not Match");
      return;
    }
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/chnage_password`,{
        method:"POST",
        headers: {
            "content-type": "application/json",
            authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({oldPassword:values.oldPassword,newPassword:values.newPassword}),
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
      <div
        className="w-full px-4 py-2 md:w-full lg:w-full"
        style={{ backgroundImage: `url("")` }}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full bg-gradient-to-b from-black via-black to-gray-800">
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="https://unsplash.it/40/40?image=883"
                alt="Lock Icon"
                className="rounded-full"
              />
              <h1 className="text-xl font-semibold text-white">Change Password</h1>
            </div>
            <p className="text-sm text-white mb-6">
              Update password for enhanced account security.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} id="changePasswordForm" className="space-y-6">
              <div>
                <label
                  htmlFor="oldPassword"
                  className="text-sm font-medium text-white block mb-2"
                >
                  Current Password *
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  {...register("oldPassword", { required: "oldPassword is required" })}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-white block mb-2"
                >
                  New Password *
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register("newPassword", { required: "newPassword is required" })}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="text-sm font-medium text-white block mb-2"
                >
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  {...register("confirmpassword", { required: "confirmpassword is required" })}
                  className="input input-bordered w-full max-w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  Clear
                </button>
              </div>
              <div id="passwordCriteria" className="text-sm space-y-2">
                <p className="text-red-500">Weak password. Must contain:</p>
                <ul className="list-disc pl-5 space-y-1 text-white">
                  <li>At least 1 uppercase</li>
                  <li>At least 1 number</li>
                  <li>At least 8 characters</li>
                </ul>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Changes Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
