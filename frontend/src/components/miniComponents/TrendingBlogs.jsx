import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import  { useContext } from "react";
import { Context } from "../../main";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";


export default function TrendingBlogs(){
  const responsive = {
    superLargeDesktop: {
      
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slideToSlide: 1
    },
    desktop: {
      breakpoint: { max:  1024 , min: 1005},
      items: 3,
      slideToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slideToSlide: 1
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slideToSlide: 1
    }
  };
  const { blogs } = useContext(Context);
  return (
    <div className="trending">
  <h3>Trending</h3>
  <Carousel responsive={responsive}>
{
  blogs && blogs.length>0 ? (
    blogs.slice(0,4).map(element=>{
      return(
        <Link to={`/blog/${element._id}`} className="card" key={element._id}>
          <img src={element.mainImage.url} alt="blog" className="blogImg"/>
          <span className="category">{element.category}</span>
          <h4>{element.title}</h4>
          <div className="writer_section">
            <div className="author">
              <img src={element.authorAvatar} alt="authoravatar"/>
              <p>{element.authorName}</p>
            </div>
          </div>
        </Link>
      )
    })
  ) : (<BeatLoader size={30} color="grey"/>)
}
</Carousel>
    </div>
  )

}
