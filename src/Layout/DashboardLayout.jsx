import { Link, Outlet, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { SiSkillshare } from "react-icons/si";
import { FaRProject } from "react-icons/fa";
import { RiProjectorLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { SiBloglovin } from "react-icons/si";
import { FaRegRegistered } from "react-icons/fa";
const DashboardLayout = () => {

    
    const navigate=useNavigate();
    const handelLogout=()=>{
        localStorage.removeItem("token");
        const token=localStorage.getItem("token");
        if(token===null){
            navigate("/login");
        }
    }

  return (
    <>
      <nav className="w-full bg-gradient-to-b from-black via-black to-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link to="/">  My Dashboard</Link>
        </div>
        <div>
        <Link to="/" className="btn btn-outline btn-sm">
            Home
          </Link>
          <Link to="/profile" className="btn btn-outline btn-sm ml-2 ">
            Profile
          </Link>
          <button   onClick={handelLogout} className="btn btn-outline ml-2 btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
      <div className="drawer lg:drawer-open pt-5 w-full bg-gradient-to-b from-black via-black to-gray-800"> {/* Adjusted padding-top to match NavBar height */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            className="drawer-overlay"
            aria-label="close sidebar"
          ></label>
          <ul className="menu p-4 w-56 min-h-full bg-base-200 text-base-content space-y-2 overflow-y-auto">
            <li>
              <Link to="/dashboard" className="btn btn-outline  w-full text-left btn-sm">
              <RxDashboard  className="text-xl" /> <span> Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add_to_skills" className="btn btn-outline w-full text-left btn-sm">
               <SiSkillshare className="text-xl" /> Add To Skills
              </Link>
            </li>
            <li>
              <Link to="/dashboard/addproject" className="btn btn-outline w-full text-left btn-sm">
               <FaRProject className="text-xl"/>   Add To Project
              </Link>
            </li>
            <li>
              <Link to="/dashboard/allprojects" className="btn btn-outline w-full text-left btn-sm">
               <RiProjectorLine className="text-xl"/>  All Project
              </Link>
            </li>
            
            <li>
              <Link to="/dashboard/allskills" className="btn btn-outline w-full text-left btn-sm">
                <SiSkillshare className="text-xl"/> All Skills
              </Link>
            </li>
           
            <li>
              <Link to="/" className="btn btn-outline w-full text-left btn-sm">
             <FaHome className="text-xl"/>   Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/change_password" className="btn btn-outline w-full text-left btn-sm">
              <MdOutlinePassword className="text-xl"/>  Change Password
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add_to_blogs" className="btn btn-outline w-full text-left btn-sm">
              < MdPostAdd className="text-xl"/>  Post Blog
              </Link>
            </li>
            <li>
              <Link to="/dashboard/all_blogs" className="btn btn-outline w-full text-left btn-sm">
              < SiBloglovin className="text-xl"/>  All Blog
              </Link>
            </li>
            <li>
  
            <Link to="/dashboard/create_new_account" className="btn btn-outline w-full text-left btn-sm">
              < FaRegRegistered  className="text-xl"/> New Account
              </Link>
            </li>
          
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
