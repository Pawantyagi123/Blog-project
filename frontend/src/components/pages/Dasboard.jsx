import { useContext, useState } from "react"
import  {Context}  from "../../main.jsx";
import { Navigate } from "react-router-dom";
 import SideBar from '../Layouts/Sidebar.jsx'
 import MyProfile from "../miniComponents/Myprofile.jsx";
 import Chart from '../miniComponents/Chart.jsx';
 import CreateBlog from "../miniComponents/CreateBlog.jsx";
 import MyBlogs from "../miniComponents/Myblog.jsx";

export default function Dasboard() {
  const [component, setComponent] = useState("MyBlogs");
  const {mode, isAuthenticated, user} = useContext(Context);
  if(!isAuthenticated || user.role === "Reader"){
return <Navigate to={"/"}/>
  }
  return (
    <section className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}>
<SideBar component={component} setComponent={setComponent}/>
{
  component === "My Profile" ? (<MyProfile/>) : component === "create Blog" ? (<CreateBlog/>) : component === "Chart" ? (
    <Chart/>
  ): (<MyBlogs/>)
}
    </section>
  )
}
