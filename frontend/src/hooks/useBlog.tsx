import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
interface BlogProps {
  "title":string,
  "content":string,
  "id":string,
  "author":{
    "name":string ,
  },
  "date":string
}



export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogProps[]>([]);

  useEffect( () => {
    const getblogs = async()=>{
      try {
       const res = await  axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
       headers:{
         Authorization:localStorage.getItem("token")
       }
      })
      setBlog(res.data.blogs)
      console.log(res.data.blogs)
      setLoading(false) 
      } catch (error) {
        console.log(error)
      }
      
    }
     getblogs() 
  }, [])

  return {
    loading,
    blog
  }
}

