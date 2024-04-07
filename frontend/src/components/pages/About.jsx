import { useContext } from "react"
import { Context } from "../../main"

export default function About() {
  const {mode}  = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
      <h2>ABOUT</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsam recusandae animi quasi, aut sint error? Porro dolorum accusantium dignissimos corrupti non velit hic nostrum consequatur commodi quis impedit voluptatibus deserunt, nobis pariatur fugiat adipisci nesciunt quisquam quos dolor id!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut minima, iste soluta nemo est explicabo sunt, repellendus aliquid quam non tenetur error unde nostrum mollitia magnam veniam? Earum velit placeat, non tempora eius tenetur hic ipsum consequatur neque, iure odit nihil libero cupiditate. Illo quia impedit dolorum! Ducimus, rem, quos aliquid nulla tempora sit veniam laboriosam iusto eius accusamus fugiat, reprehenderit vero nostrum doloribus molestiae ad placeat. Molestias, nemo consequuntur!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ea unde ut quam mollitia inventore! Praesentium ad, sint fugiat quibusdam voluptatum sunt commodi minima reprehenderit aliquid cum? Error tempore officiis commodi soluta rem architecto voluptatum sunt, veniam explicabo autem reprehenderit aliquid odit porro perspiciatis voluptates debitis magnam corrupti expedita obcaecati!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga commodi dicta tenetur repudiandae consequuntur. Rem ex dicta mollitia consectetur eaque.
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae.</p>
      </div>
    </article>
  )
}
