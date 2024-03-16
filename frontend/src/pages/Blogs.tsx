import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import Spinner from "../components/Spinner";
import { useBlogs } from "../hooks/useBlog";



function Blogs() {
  const { loading, blog } = useBlogs();
  if (loading || !blog) {
    return <Spinner/>
  }
  return (
    <div className="w-[100%] flex flex-col justify-center items-center">
      <Appbar />
      <div className=" flex flex-col justify-center items-center   w-[100%]  max-w-[90rem]  px-[3rem] py-9 ">
        {blog.map(blog => <BlogCard
          id={blog.id}
          authorname={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate={"10-March"}
        />)}



      </div>
    </div>
  )
}

export default Blogs