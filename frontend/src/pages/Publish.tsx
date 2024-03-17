import { useRef, useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import JoditEditor from "jodit-react";

function Publish() {
  const editor = useRef(null)
    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()
  
  const handlePublish = async()=>{
    try {
    if(!title || !content){
      toast.error("fill all feild")
      return;
    }
    const res = await axios.post(`${BACKEND_URL}/api/v1/blog/`,{
      title,content
  },{
      headers:{
          Authorization:localStorage.getItem("token")
      }
  });
  toast.success("Blog post published successfully!");
  setTitle("")
  setContent("")
  setTimeout(() => {
    
    navigate(`/blog/${res.data.id}`)
  }, 1000);
  } catch (error) {
    console.log(error)
    toast.error(`Error while Publishing Blog . Please try again.`);
  }
}

  return (
    <div className=" w-[100%]  flex flex-col  items-center">
<Appbar/>
  <div className="  max-w-[60rem] w-full justify-center items-center  px-9 flex py-6">
  <ToastContainer />
  <div className=" w-screen  mx-auto p-4 bg-white shadow-md rounded-lg">
    <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
    <input 
      required 
      onChange={(e) => setTitle(e.target.value)} 
      value={title} 
      type="text" 
      id="title" 
      className="mt-1 mb-4 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
    />

   

    <label htmlFor="content" className="block text-gray-700 font-semibold">Content</label>
  <JoditEditor
    ref={editor}
    className="mt-1 mb-4 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
    value={content}
    
    onChange={newContent => setContent(newContent)} 
/>



    <button  
       onClick={handlePublish}
      className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Publish
    </button>
    
  </div>
  </div>
  </div>
  )
}

export default Publish