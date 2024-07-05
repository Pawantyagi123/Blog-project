import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { BeatLoader } from "react-spinners";

export default function Author() {
  const { mode } = useContext(Context);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await axios.get("https://blog-project-swgo.vercel.app//user/authors", {
        withCredentials: true,
      });
      setAuthors(data.authors);
    };
    fetchAuthors();
  }, []);

  return (
    <article
      className={
        mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img src={element.avatar.url} alt="author_avatar" />
                <h1>{element.name}</h1>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <BeatLoader size={30} color="grey" style={{ padding: "200px 0" }} />
        )}
      </div>
    </article>
  );
}
