import { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ setComponent }) {
  const [show, setShow] = useState(false);
  const { mode, setMode, setIsAuthenticated,user } = useContext(Context);
  const navigateTo = useNavigate();

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://blog-project-swgo.vercel.app/user/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const gotoHome = () => {
    navigateTo("/");
  };
  const handleComponent = (value) => {
    setComponent(value);
  };

  return (
    <>
      <div className="icon-wrapper" onClick={() => setShow(!show)}>
        <RxHamburgerMenu />
      </div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setShow(!show)}>
          <FaArrowLeft />
        </div>
        <div className="user-detail">
          <img src={user && user.avatar.url} alt="avatar" />
          <p>{user.name}</p>
        </div>
        <ul>
          <button onClick={() => handleComponent("MyBlogs")}>MY BLOGS</button>
          <button onClick={() => handleComponent("create Blog")}>
            CREATE BLOGS
          </button>
          <button onClick={() => handleComponent("Chart")}>CHART</button>
          <button onClick={() => handleComponent("My Profile")}>MY PROFILE</button>
          <button onClick={gotoHome}>HOME</button>
          <button onClick={handlelogout}>LOGOUT</button>
          <button
            onClick={() =>
              mode === "light" ? setMode("dark") : setMode("light")
            }
            className={
              mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
            }
          >
            {mode === "light" ? (
              <CiLight className="light-icon" />
            ) : (
              <MdDarkMode className="dark-icon" />
            )}
          </button>
        </ul>
      </section>
    </>
  );
}
