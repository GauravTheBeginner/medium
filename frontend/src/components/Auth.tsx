import { Link,useNavigate } from "react-router-dom"
import LabelInput from "./LabelInput"
import { useState } from "react"
import { SigninInput } from "@gaurav8861r/medium-common"
import axios from "axios"
import {BACKEND_URL} from "../../config"

function Auth({ type }: { type: "Signup" | "Signin" }) {
  const navigate = useNavigate()
  const [postInput, setPostInput] = useState<SigninInput>({
    email: "",
    name: "",
    password: ""
  })


const sendRequest = async ()=>{
  try {
   const  response = await axios.post(`${BACKEND_URL}/api/v1/${type == "Signup"?"signup":"signin"}`,postInput) 
   const jwt = response.data.token;
   const name = response.data.name;
   console.log(name)
   localStorage.setItem("token",jwt)
   localStorage.setItem("name",name)
   navigate("/blogs")
  } catch (error) {
    console.log(error)
  }

}

  return (
    <div className=" h-screen flex flex-col  justify-center">
      <div className="flex flex-col  justify-center items-center">
        <div className=" text-3xl  font-extrabold">Create Account</div>
        <div className="  text-slate-400 mb-2  ">{type == "Signin" ? "Don't have an account?" : "Already have an account?"} <Link className="pl-1 underline" to={type == "Signin" ? "/signup" : "/signin"}>
          {type == "Signin" ? "Sign up" : "Sign in"}
        </Link></div>
        <LabelInput label={"Email"} placeholder={"Gaurav@gmail.com"} onChange={(e) => {
          setPostInput({
            ...postInput,
            email: e.target.value
          })
        }} />
        {type == "Signup" ? <LabelInput label={"Name"} placeholder={"Gaurav"} onChange={(e) => {
          setPostInput({
            ...postInput,
            name: e.target.value
          })
        }} /> : ""}


        <LabelInput label={"Password"} type={"password"} placeholder={"min 6 letter"} onChange={(e) => {
          setPostInput({
            ...postInput,
            password: e.target.value
          })
        }} />
        <button type="button" onClick={sendRequest} className=" border bg-black mt-5 border-gray-300 text-white text-md rounded-lg  block w-[18rem] p-2.5 "> {type == "Signin" ? "Sign in" : "Sign up"}</button>
      </div>
    </div>
  )
}

export default Auth