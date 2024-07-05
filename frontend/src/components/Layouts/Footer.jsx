import { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsInstagram,BsFacebook,BsTwitter } from "react-icons/bs";
import { FaGit } from "react-icons/fa";

export default function Footer() {
  const isDashboard = useLocation("https://blog-project-nine-sepia.vercel.app/dashboard");
const {mode} = useContext(Context)
  return (

  <footer className={isDashboard.pathname === '/dashboard' ? "hideFooter": mode === "light" ? "light-footer": "dark-footer"}
  >
<div className="container">
  <div className="about">
    <h3>About</h3>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat velit ipsum maiores labore porro quia nisi quis ea eos ad adipisci, quidem accusantium odit laborum?</p>

    <p><span>Email:</span>pawantyaginnl2002@gmail.com</p>

    <p><span>Phone:</span>9499210600</p>
  </div>
  <div className="quick_links">
    <h3>Quick Links</h3>
    <ul>
      <Link to={"/"}>Home</Link>
      <Link to={"/blogs"}>Blogs</Link>
      <Link to={"/about"}> About</Link>
      <Link to={"/dashboard"}>Dashboard</Link>
    </ul>
  </div>
  <div className="categories">
    <h3>Categories</h3>
    <ul>
      <li>LifeStyle</li>
      <li>Technology</li>
      <li>Sports</li>
      <li>Travel</li>
      <li>Business</li>
      <li>Economy</li>
    </ul>
  </div>
  <div className="news_letter">
    <div>
      <h3>Weekly NewsLetter</h3>
      <p>Get Blog articles and offer via email</p>
    </div>
    <div>
      <input type="text" placeholder="Your Email"></input>
      <button>Subscribe</button>
    </div>
  </div>
</div>
<div className="container">
  <div className="logo">HERO <span>BLOGS</span></div>
  <div className="links">
    <Link to={'/'} target="_blank"><BsInstagram /></Link>
    <Link to={'/'} target="_blank"><BsFacebook /></Link>
    <Link to={'/'} target="_blank"><BsTwitter /></Link>
    <Link to={'/'} target="_blank"><FaGit /></Link>
  </div>
</div>
  </footer>
  )
}
