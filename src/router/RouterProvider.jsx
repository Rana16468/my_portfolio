import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../page/Home/HomePage";
import Login from "../page/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../page/Dashboard/Dashboard";
import PrivateRouter from "./PrivateRouter";
import AddToSkills from "../page/Dashboard/AddToSkills";
import AllSkills from "../page/Dashboard/AllSkills";
import AddProjects from "../page/Dashboard/AddProjects";
import AllProjects from "../page/Dashboard/AllProjects";
import ProjectDetails from "../page/Dashboard/ProjectDetails";
import AddToDetails from "../page/Dashboard/AddToDetails";
import AddToBlogs from "../page/Dashboard/AddToBlogs";
import AllBlogs from "../page/Dashboard/AllBlogs";
import ChangePassword from "../page/Dashboard/ChangePassword";
import CreateAdmin from "../page/Dashboard/CreateAdmin";
import HomeProjectDetails from "../components/HomeProjectDetails";




const routes = createBrowserRouter([

    {
        path: "/",
        element:<Main/>,
        children:[
            { path: "/", element:<HomePage/> },
            
          
            
        ]
    },
    {
        path: "/dashboard",
        element:<PrivateRouter>
            <DashboardLayout/>
        </PrivateRouter>,
        children:[
            {  path: "/dashboard",element:<PrivateRouter>
                <Dashboard/>
            </PrivateRouter>},
            {path:"/dashboard/add_to_skills",element:<PrivateRouter>
                <AddToSkills/>
            </PrivateRouter>},
            {path:"/dashboard/allskills",element:<PrivateRouter><AllSkills/></PrivateRouter>},
            {path:"/dashboard/addproject",element:<PrivateRouter><AddProjects/></PrivateRouter>},
            {path:"/dashboard/allprojects",element:<PrivateRouter><AllProjects/></PrivateRouter>},
            {path:"/dashboard/project_details/:id",element:<PrivateRouter><ProjectDetails/></PrivateRouter>},
            {path:"/dashboard/add_to_details/:id",element:<PrivateRouter> <AddToDetails/>  </PrivateRouter>},
            {path:"/dashboard/add_to_blogs",element:<PrivateRouter><AddToBlogs/></PrivateRouter>},
            {path:"/dashboard/all_blogs",element:<PrivateRouter><AllBlogs/></PrivateRouter>},
            {path:"/dashboard/change_password",element:<PrivateRouter>< ChangePassword/></PrivateRouter>},
            {path:"/dashboard/create_new_account",element:<PrivateRouter><CreateAdmin/></PrivateRouter>}
           
        ]
    },

    {
        path:"/login",
        element:<Login/>
    },
    {path:"/project_details/:id",element:<HomeProjectDetails/>},

]);

export default routes;