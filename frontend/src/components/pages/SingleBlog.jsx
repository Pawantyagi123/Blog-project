import { useContext, useEffect, useState } from "react"
import { Context } from "../../main"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";


export default function SingleBlog() {
  const {mode,isAuthenticated}  = useContext(Context);
  const {id} = useParams();
const [blog, setBlog] = useState();
useEffect(()=>{
  const getSingleBlog = async()=>{
    try{
      const {data} = await axios.get(`http://localhost:4000/blog/singleblog/${id}`, {withCredentials: true}
      );
      setBlog(data.blog);
    }catch(error){
    setBlog({});
    }
  }
  getSingleBlog();
}, []);
if(!isAuthenticated){
  return<Navigate to={"/"}/>
}
  return (
    <article className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}>
{
blog && (
  <section className="container">
    <div className="category">
      {blog.category}
    </div>
    <h1>{blog.title}</h1>
    <div className="writer_section">
      <div className="author">
        <img src={blog.authorAvatar} alt="authorAvatar" />
        <p>{blog.authorName}</p>
      </div>
    </div>
    {
      blog && blog.mainImage && (
        <img src={blog.mainImage.url} alt="mainimage" className="mainImg"/>
      )
    }
    <p className="intro-text">{blog.intro}</p>
    <div className="sub-para">
      <h3>{blog.paraOneTitle}</h3>
      {
        blog && blog.paraOneImage && (
          <img src={blog.paraOneImage.url} alt="paraOneimg"/>
        )
      }
      <p>{blog.paraOneDescription}</p>
    </div>
    <div className="sub-para">
      <h3>{blog.paraTwoTitle}</h3>
      {
        blog && blog.paraTwoImage && (
          <img src={blog.paraTwoImage.url} alt="paraTwoimg"/>
        )
      }
      <p>{blog.paraTwoDescription}</p>
    </div>
    <div className="sub-para">
      <h3>{blog.paraThreeTitle}</h3>
      {
        blog && blog.paraThreeImage && (
          <img src={blog.paraThreeImage.url} alt="parathreeimg"/>
        )
      }
      <p>{blog.paraThreeDescription}</p>
    </div>
  </section>
)
}
    </article>
  )
}
