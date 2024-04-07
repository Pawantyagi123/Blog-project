import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Register from './components/pages/Register.jsx'
import Login from  './components/pages/Login.jsx'
import Blog from './components/pages/Blog.jsx'
import SingleBlog from './components/pages/SingleBlog.jsx'
import About from './components/pages/About.jsx'
import Author from './components/pages/Author.jsx'
import Dashboard from './components/pages/Dasboard.jsx'
import UpdateBlog from './components/pages/UpdateBlog.jsx'
import Navbar from './components/Layouts/Navbar.jsx'
import Footer from './components/Layouts/Footer.jsx'
import { useContext, useEffect } from 'react'
import { Context } from './main.jsx'
import { Toaster } from "react-hot-toast";

import axios from 'axios'

import './App.css'

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const { setUser, isAuthenticated, setIsAuthenticated, user, setBlogs } =
    useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/user/myprofile",
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/blog/all",
          { withCredentials: true }
        );
        setBlogs(data.allBlogs);
      } catch (error) {
        setBlogs([]);
      }
    };
    fetchUser();
    fetchBlogs();
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<Author />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}

