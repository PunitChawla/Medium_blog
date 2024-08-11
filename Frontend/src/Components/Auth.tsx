import { SignupInput } from "@punitchawla/mediumblogschema";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    // input variable should store in state variable so  for type sfety we use our common moudle here which tail us ki yahi input aane chahiye agar kuch or huaa to it's threw an error 
    // it's give a very nice suggestion as well as 
    const [postInputs , setPostInputs] = useState<SignupInput>({
        name : "",
        username : "",  
        password : ""
    })
    async function sendrequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" :"signin"}`,postInputs)
            const jwt = response.data.jwt;
            localStorage.setItem("token" , jwt)
            navigate("/blogs")
        } catch (error) {
            
        }
    }
  return (
    <div className=" flex justify-center flex-col h-screen">
      <div className="flex justify-center">
        <div >
        <div className="px-10">
          <div className="font-extrabold text-3xl">
            Create an account 
          </div>
          <div className="text-gray-600" >
            {type == "signin" ? "Don't have any account " :"Already have an account ?" } 
            <Link to={ type == "signin" ? '/signup' : '/signin'} className="text-blue-600 underline">  {type == "signin" ? "Sign up": "Sign in" }</Link>
          </div>
        </div>

        <div className="pt-8">
        
           {type == "signup" ?  <LablledInput label = "Name"  placeholder="Punit chawla ... " onChange={(e)=>{
                // ...postinputs show get all existing state and update name as given target 
                setPostInputs({
                    ...postInputs,
                    name : e.target.value
                })
            }}></LablledInput> : null} 

            <LablledInput label = "UserName"  placeholder="punit@gmail.com" onChange={(e)=>{
                // ...postinputs show get all existing state and update name as given target 
                setPostInputs({
                    ...postInputs,
                    username : e.target.value
                })
            }}></LablledInput>
            <LablledInput label = "Password" type = {"password"} placeholder="12345" onChange={(e)=>{
                // ...postinputs show get all existing state and update name as given target 
                setPostInputs({
                    ...postInputs,
                    password : e.target.value
                })
            }}></LablledInput>

                <button onClick={sendrequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full mt-7">
                    {type ==  "signup" ? "Sign up" : "Sign in"}
                </button>
        </div>
      </div>
      </div>
    </div>
  );
};

interface lablledInputType{
    label : string;
    placeholder : string;
    onChange : (e:ChangeEvent<HTMLInputElement>) =>void;
    type?: string
    // here type which hide the password 
}
function LablledInput({ label ,placeholder, onChange, type } :lablledInputType)
{
    return   <div>
    <label className="block mb-2 text-sm font-semibold text-gray-900 pt-4">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
</div>
}