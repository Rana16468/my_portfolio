
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRouter = ({ children }) => {
  let location = useLocation();

  const token=localStorage.getItem("token");
 if(token===null){
    return <Navigate to="/login" state={{ from: location }} replace />;
 }
  const user = jwtDecode(token);
  if (user) { return children;}
  

    
  

 
};

export default PrivateRouter;
