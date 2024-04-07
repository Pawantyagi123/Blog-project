import { Link } from "react-router-dom";

export default function Latestblog({ heading, newClass, blogs }) {
  return (
    <section
      className={
        newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"
      }
    >
      <h3>{heading}</h3>
      <div className="container">
        {blogs &&
          blogs.map(element => {
            return(
            <Link to={`/blog/${element._id}`} key={element._id} className="card">
              <img src={element.mainImage.url} alt="mainImg" />
              <span className="category">{element.category}</span>
              <h4>{element.title}</h4>
              <div className="writer_section">
                <div className="author">
                  <img src={element.authorAvatar} alt="authoravatar" />
                  <p>{element.authorName}</p>
                </div>
              </div>
            </Link>
          );
})}
      </div>
    </section>
  );
}
