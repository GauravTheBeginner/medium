import { Link } from "react-router-dom"
import Avatar from "./Avatar"



function Appbar() {
  
  const name = localStorage.getItem("name" )|| "anonymous";
  return (
    <div className=" w-[100%] flex  justify-center   border-b-[0.5px] ">
    <div className=" flex items-center  w-[100%] max-w-[75rem] h-[4rem] py-4  justify-between px-10">
        <Link to={"/blogs"} className=" font-bold text-xl">
            Medium
        </Link>
        <div className=" space-x-2  flex   justify-center items-center">
       <Link to={"/publish"}   className=" border-none px-2 rounded-xl text-[12px] bg-green-400 hover:bg-green-500 text-white font-medium py-[3px] "> Publish </Link>
            <Avatar name={name}/>
        </div>
    </div>
    </div>
  )
}

export default Appbar