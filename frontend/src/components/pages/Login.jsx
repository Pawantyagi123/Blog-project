import axios from "axios"
import { Context } from "../../main"
import toast from "react-hot-toast"
import { useContext, useState } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const {mode, isAuthenticated} = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
e.preventDefault();
await axios.post("http://localhost:4000/user/login", {email,password,role}, {withCredentials: true, headers: {"Content-Type": "application/json"}}
).then(res=>{
  toast.success(res.data.message);
  setEmail("");
setPassword("");
setRole("");
navigate("/")
}).catch(error=>{
  toast.error(error.response.data.message)
});
  };
  
  if(isAuthenticated){
    return<Navigate to={"/"}/>
  }
  return (
    <>
     <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
    <section className="auth-form">
      <form onSubmit={handleLogin}>
        <h1>LOGIN</h1>
        <select value={role} onChange={(e)=> setRole(e.target.value)}>
          <option value="">SELECT ROLE</option>
          <option value="Reader">READER</option>
          <option value="Author">AUTHOR</option>
        </select>
        <div>
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Your Email" />
        </div>
        <div>
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password"/>
        </div>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        </div>
        <p>Don&apos;t have any account? <Link to={"/register"}>Register Now</Link></p>
        <button type="submit" className="submit-btn">LOGIN</button>
      </form>
    </section>
    </article>
    </>
  )
}
