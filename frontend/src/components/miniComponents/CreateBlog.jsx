import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraOneDescription, setParaOneDescription] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraTwoDescription, setParaTwoDescription] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("");
  const [paraThreeDescription, setParaThreeDescription] = useState("");
  const [paraThreeTitle, setParaThreeTitle] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(true);

  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };

  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    };
  };

  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    };
  };

  const paraThreeImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaThreeImagePreview(reader.result);
      setParaThreeImage(file);
    };
  };
  const handleBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("mainImage", mainImage);
    formData.append("intro", intro);
    formData.append("published", published);
    if (paraOneTitle.length > 0) {
      formData.append("paraOneTitle", paraOneTitle);
    }
    if (paraOneImage) {
      formData.append("paraOneImage", paraOneImage);
    }
    if (paraOneDescription.length > 0) {
      formData.append("paraOneDescription", paraOneDescription);
    }
    if (paraTwoTitle.length > 0) {
      formData.append("paraTwoTitle", paraTwoTitle);
    }
    if (paraTwoImage) {
      formData.append("paraTwoImage", paraTwoImage);
    }
    if (paraTwoDescription.length > 0) {
      formData.append("paraTwoDescription", paraTwoDescription);
    }
    if (paraThreeTitle.length > 0) {
      formData.append("paraThreeTitle", paraThreeTitle);
    }
    if (paraThreeImage) {
      formData.append("paraThreeImage", paraThreeImage);
    }
    if (paraThreeDescription.length > 0) {
      formData.append("paraThreeDescription", paraThreeDescription);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/blog/postblog",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTitle("");
      setIntro("");
      setCategory("");
      setMainImage("");
      setMainImagePreview("");
      setParaOneImage("");
      setParaOneImagePreview("");
      setParaOneTitle("");
      setParaOneDescription("");
      setParaTwoImage("");
      setParaTwoImagePreview("");
      setParaTwoTitle("");
      setParaTwoDescription("");
      setParaThreeImage("");
      setParaThreeImagePreview("");
      setParaThreeTitle("");
      setParaThreeDescription("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="create-blog">
        <h3>CREATE BLOG</h3>
        <div className="container">
          <form onSubmit={handleBlog}>
            <div className="category-box">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Blog Category</option>
                <option value="LifeStyle">LifeStyle</option>
                <option value="Technology">Technology</option>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="Travel">Travel</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Blog main Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Blog Main Image</label>
              <img
                src={mainImagePreview ? `${mainImagePreview}` : "/imgPL.webp"}
                alt="mainImage"
                className="mainImg"
              />
              <input
                type="file"
                onChange={mainImagePreviewHandler}
                style={{ border: "none" }}
              />
            </div>
            <textarea
              rows="25"
              className="intro"
              placeholder="Blog intro...."
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
            <div className="sub-para">
              <input
                type="text"
                placeholder="Paragraph one title"
                value={paraOneTitle}
                onChange={(e) => setParaOneTitle(e.target.value)}
              />
              <img src={paraOneImagePreview ? `${paraOneImagePreview}`: "/imgPL.webp"} alt="paraoneimage" />
              <input type="file" onChange={paraOneImagePreviewHandler}
                style={{ border: "none" }}/>
                 <textarea
              rows="10"
              className="intro"
              placeholder="Blog first paragraph comes here....."
              value={paraOneDescription}
              onChange={(e) => setParaOneDescription(e.target.value)}
            />
            </div>
            <div className="sub-para">
              <input
                type="text"
                placeholder="Paragraph Two title"
                value={paraTwoTitle}
                onChange={(e) => setParaTwoTitle(e.target.value)}
              />
              <img src={paraTwoImagePreview ? `${paraTwoImagePreview}`: "/imgPL.webp"} alt="paraTwoimage" />
              <input type="file" onChange={paraTwoImagePreviewHandler}
                style={{ border: "none" }}/>
                 <textarea
              rows="10"
              className="intro"
              placeholder="Blog Second paragraph comes here....."
              value={paraTwoDescription}
              onChange={(e) => setParaTwoDescription(e.target.value)}
            />
            </div>
            <div className="sub-para">
              <input
                type="text"
                placeholder="Paragraph Three title"
                value={paraThreeTitle}
                onChange={(e) => setParaThreeTitle(e.target.value)}
              />
              <img src={paraThreeImagePreview ? `${paraThreeImagePreview}`: "/imgPL.webp"} alt="paraThreeimage" />
              <input type="file" onChange={paraThreeImagePreviewHandler}
                style={{ border: "none" }}/>
                 <textarea
              rows="10"
              className="intro"
              placeholder="Blog Third paragraph comes here....."
              value={paraThreeDescription}
              onChange={(e) => setParaThreeDescription(e.target.value)}
            />
            </div>
            <div className="publish-box">
              <label>Wants to published now?</label>
              <select value={published} onChange={(e)=> setPublished(e.target.value === "true")}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <button type="submit" className="create-btn">CREATE BLOG</button>
          </form>
        </div>
      </section>
    </>
  );
}
