import { useContext } from "react"
import { Context } from "../../main.jsx";
import Latestblog from "../miniComponents/Latestblog.jsx";

export default function Blog() {
  const {mode,blogs} = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
<Latestblog blogs={blogs} title={"Blogs"}/>
    </article>
  )
}
