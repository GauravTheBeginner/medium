import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const updateUser = async () => {
    try {
      if (!name || !password) {
        toast.error("Please fill all the fields.");
        return;
      }
      const res = await axios.put(`https://backend.backend123.workers.dev/api/v1/${id}`, {
        name,
        password
      });
      localStorage.setItem("name", name);
      toast.success("User updated successfully!");
      setName("")
      setPassword("")
      setTimeout(() => {

        navigate('/blogs')
      }, 1000);
      console.log(res.data);
    } catch (error) {

      console.error("Error updating user:", error);

      toast.error("Failed to update user. Please try again later.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Appbar />
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 py-8">
  <h1 className="text-3xl mb-6 font-bold text-center">Update Your Profile</h1>
  <div className="flex flex-col space-y-4">
    <div className="flex flex-col my-2">
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
      <input id="name" type="text" placeholder="Enter your updated name" className="border border-gray-300 text-gray-500 text-md rounded-lg  block w-[18rem] p-2.5 " onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="flex flex-col my-2">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
      <input id="password" type="password" placeholder="Enter your updated Password" className="border border-gray-300 text-gray-500 text-md rounded-lg  block w-[18rem] p-2.5 " onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button onClick={updateUser} className="bg-black text-white text-lg font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-300">Update</button>
  </div>
</div>

    </div>
  );
}
