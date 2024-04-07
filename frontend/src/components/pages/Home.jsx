import { useContext } from "react"
import { Context } from "../../main.jsx";
import HeroSection from '../miniComponents/HeroSection.jsx'
import TrendingBlogs from '../miniComponents/TrendingBlogs.jsx'
import LatestBlogs from '../miniComponents/Latestblog.jsx';
import PopularAuthor from '../miniComponents/PopularAuthor.jsx'
export default function Home() {
  const {mode,blogs} = useContext(Context);
const filteredBlogs = blogs.slice(0,6);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection/>
      <TrendingBlogs/>
      <LatestBlogs blogs={filteredBlogs} heading={"Latest Blogs"}/>
      <PopularAuthor/>
    </article>
  )
}
