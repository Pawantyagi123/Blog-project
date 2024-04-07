import axios from "axios";
import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners";

export default function PopularAuthor() {
  const [authors, setAuthors] = useState([]);
  useEffect(()=>{
const fetchAuthors = async()=>{
  const {data} = await axios.get("http://localhost:4000/user/authors",
  {withCredentials: true}
  );
  setAuthors(data.authors);
};
fetchAuthors();
  }, []);
  return (
    <section className="popularAuthors">
    <h3>Popular Authors</h3>
    <div className="container">
{
  authors && authors.length>0 ? (authors.slice(0,4).map((element)=>{
    return(
      <div className="card" key={element._id}>
        <img src={element.avatar.url} alt="author" />
        <p>{element.name}</p>
        <p>{element.role}</p>
      </div>
    );
  })
  ) : (<BeatLoader size={30} color="red"/>
  )
}
    </div>
    </section>
  )
}
