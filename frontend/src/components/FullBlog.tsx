import Blog from "../pages/Blog"
import Appbar from "./Appbar"
import Avatar from "./Avatar"


function FullBlog({ blog }: { blog: Blog }) {
  return (
    <div className=" w-[100%]  ">
      <Appbar />
      <div className="flex justify-center">
        <div className="grid  space-x-5 grid-cols-12   px-10 w-full max-w-[70rem] pt-10">
          <div className=" col-span-7">
            <div className="text-3xl font-extrabold">{blog.title}</div>
           
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className=" col-span-5">
            <div className=" text-slate-600 text-lg">Author</div>
            
            <div className="flex ">
              <div className=" pr-2  flex justify-center items-center"> <Avatar name={blog.author.name[0]} /></div>
             
              <div className="">
              <div className="text-xl font-bold"> 
              {blog.author.name || "Anonymous"}
              </div>

              <div className="pt-1 text-slate-500">
                Random  Catch phrase about the author's ability to grab the user's attention.
              </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullBlog