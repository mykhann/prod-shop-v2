import axios from "axios";
import Navbar from "../shared/Navbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../reduxStore/authSlice";

const Signup = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector(store=>store.auth)
    const [input,setInput]=useState({
        file:null,
        name:user?.name ||"",
        email:user?.email ||"",
        address:user?.address ||"",
        phoneNo:user?.phoneNo ||"",

    })
    const onChangeInputHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})

    }
    const changeFileHandler=(e)=>{
        setInput({
            ...input,
            file: e.target.files?.[0]
        })
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        const form = new FormData();
        form.append("name",input.name)
        form.append("address",input.address)
        form.append("email",input.email)
        // form.append("phoneNo",input.phoneNo)
        
        if (input.file){
            form.append("file",input.file)
        }
        try {
            const res=await axios.patch("https://prod-shop-v2.onrender.com/api/v1/users/update",form,{
                withCredentials:true,
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            console.log(res.data)
            if (res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                navigate("/profile")
             
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
            
            
        }
    }
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
          <form onSubmit={submitHandler}>
            {/* Profile Picture Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="flex items-center mt-1">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="file"
                    name="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={changeFileHandler}
                  />
                  <span className="inline-flex items-center justify-center w-full p-2 border border-gray-300 rounded-md bg-gray-900  hover:bg-red-800 text-white">
                    Choose a profile
                  </span>
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={onChangeInputHandler}
                value={input.name}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
           
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={onChangeInputHandler}
                value={input.email}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            

            {/* Address Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                onChange={onChangeInputHandler}
                value={input.address}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-red-600"
            >
                Update
            </button>
          </form>

          {/* Link to Login */}
          <div className="flex justify-center mt-3">
            <Link to="/profile">
              <p className="font-medium cursor-pointer text-gray-900 hover:text-red-600">
                Cancel
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
