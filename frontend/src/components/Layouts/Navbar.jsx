import { useContext } from "react";
import { useState } from "react"
import { useLocation,useNavigate, Link} from "react-router-dom";
import {Context} from '../../main.jsx'
import { CiLight} from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const  [show, setShow] = useState(false);
  const handleNavbar = ()=>{
    setShow(!show);
  };


  const isDashboard = useLocation("https://blog-project-nine-sepia.vercel.app/dashboard");

  const {mode, setMode,isAuthenticated,user,setIsAuthenticated,setUser } = useContext(Context) ;

  const navigateTo = useNavigate();

  const handlelogout = async(e)=>{
    e.preventDefault();
    try{
      const {data}= await axios.get("http://localhost:4000/user/logout", {withCredentials: true}
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/")
    }catch(error){
toast.error(error.response.data.message)
    }
  }
  return (
    
    <section className={isDashboard.pathname === '/dashboard' ? "hideNavbar": mode === "light" ? "header light-navbar": "header dark-navbar"}>

<nav>
  <div className="logo">Hero<span>Blog</span></div>
  <div className={show ? "links show" : "links"}>
    <ul>
      <li>
        <Link to={"/"} onClick={handleNavbar}>HOME</Link>
      </li>
      <li>
        <Link to={"/blogs"} onClick={handleNavbar}>BLOGS</Link>
      </li>
      <li>
        <Link to={"/authors"} onClick={handleNavbar}>AUTHOR</Link>
      </li>
      <li>
        <Link to={"/about"} onClick={handleNavbar}>ABOUT</Link>
      </li>
    </ul>
    <div className="btns">
      <button onClick={()=> mode === "light" ? setMode("dark"): setMode("light")} className={mode === "light" ? "mode-btn light-mode": "mode-btn dark-mode"}>
{
  mode === "light" ? (
    <CiLight className="light-icon"/>
  ): (<MdDarkMode className="dark-icon"/>)
}
      </button>
      {
        isAuthenticated && user.role === "Author" ? (<Link to={"/dashboard"} onClick={handleNavbar} className="dashboard-btn">DASHBOARD</Link>) : ("")
      }
      {
        !isAuthenticated ? (<Link to={"/login"} onClick={handleNavbar} className="login-btn">LOGIN</Link>) : (<button onClick={handlelogout} className="logout-btn">LOGOUT</button>)
      }
    </div>
  </div>
  <RxHamburgerMenu className="hamburger" onClick={handleNavbar}/>
</nav>
    </section>
    
    
  )
}
