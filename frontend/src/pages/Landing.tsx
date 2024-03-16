import { useNavigate } from "react-router-dom"
import Appbar from "../components/Appbar"


function Landing() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
  return (
    <div className="w-full bg-yellow-300  h-screen flex flex-col  items-center">
    <Appbar />
    <div className=" w-full max-w-screen-xl  flex    flex-col justify-center  px-5   py-8 md:px-8 lg:px-16">
        <div className=" text-5xl lg:text-9xl font-semibold pb-7 antialiased">Stay curious.</div>
        <div className=" font-medium subpixel-antialiased pb-16 text-2xl">Discover stories, thinking, and expertise from writers on any topic.</div>
        <div>
           {  token ? <button onClick={()=> navigate('/blogs')}  className=" bg-black px-9 py-2 rounded-lg text-md text-white subpixel-antialiased">Start Reading</button> : <button onClick={()=> navigate('/signup')}  className=" bg-black px-9 py-2 rounded-lg text-md text-white subpixel-antialiased">Sign up</button>}
        </div>
    </div>
  </div>
  )
}

export default Landing