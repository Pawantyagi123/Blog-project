import { useContext, useState } from "react"
 import { Context } from "../../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function Register() {
  const [name,setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState(0);
  const [role, setRole] = useState();
  const [education, setEducation] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const changeAvatarHandler=(e)=>{
const file= e.target.files[0];
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload= ()=>{
  setAvatarPreview(reader.result);
  setAvatar(file);
}
  };

  const {mode, isAuthenticated} = useContext(Context);
const navigateTo = useNavigate();
const handleRegister = async(e)=>{
  e.preventDefault();
  const formData=  new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("phone", phone);
  formData.append("role", role);
  formData.append("education", education);
  formData.append("avatar", avatar);

  try{
    const {data} = await axios.post("https://blog-project-swgo.vercel.app/user/register", formData, {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}}
    )
    setName("");
    setEmail("");
    setEducation("");
    setAvatar("");
    setPassword("");
    setAvatarPreview("");
    setPhone("");
    setRole("")
    toast.success(data.message);
    navigateTo("/")
  }catch(error){
toast.error(error.response.data.message)
  }
};
if(isAuthenticated ){
  return <Navigate to={"/"}/>
}
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
    <section className="auth-form">
      <form onSubmit={handleRegister}>
        <h1>REGISTER</h1>
        <select value={role} onChange={(e)=> setRole(e.target.value)}>
          <option value="">SELECT ROLE</option>
          <option value="Reader">READER</option>
          <option value="Author">AUTHOR</option>
        </select>
        <div>
          <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter Your Name" />
        </div>
        <div>
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Your Email" />
        </div>
        <div>
          <input type="number" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Phone Number"/>
        </div>
        <div>
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password"/>
        </div>
        <select  value={education} onChange={(e)=> setEducation(e.target.value)}>
          <option value="">SELECT EDUCATION</option>
          <option value="Matric">X</option>
          <option value="intermediate">XII</option>
          <option value="Graduation">GRADUATION</option>
          <option value="Post Graduation">POST GRADUCATION</option>
        </select>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <div className="avatar">
            <img src={avatarPreview ? `${avatarPreview}`: "/pic.jpg"} alt="avatar image" />
          </div>
          <input type="file" onChange={changeAvatarHandler} className="avatar_input_tag" style={{border: "none"}} />
        </div>
        <p>Already Registered? <Link to={"/login"}>Login Now</Link></p>
        <button type="submit" className="submit-btn">REGISTER</button>
      </form>
    </section>
    </article>
  )
}
