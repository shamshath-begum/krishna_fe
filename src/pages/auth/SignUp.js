import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../App";


function SignUp() {
    const [show, setShow] = useState(false);
  const [cpassshow, setcpassShow] = useState(false);

  let navigate=useNavigate()

  const[inputData,setInputData]=useState({
    name:"",
    email:"",
    password:"",
    cpassword:"",
    
})
console.log(inputData)
const[image,setImage]=useState("")
const[preview,setPreview]=useState("")

const setData=(e)=>{
const{name,value}=e.target
setInputData(()=>{
return {
    ...inputData,
    [name]:value
}
})
}

let setImageFile=(e)=>{
  console.log(e.target.files[0])
  setImage(e.target.files[0])
}

const handleSignUp=async(e)=>{
e.preventDefault()

const{name,email,password,cpassword}=inputData
console.log(inputData)
if(name===""){
    alert("Please Enter Your Name")
}else if(email===""){
    alert("Please Enter Your Email")
}else if(!email.includes("@")){
    alert("Please Enter Your Valid Email")
}else if(password===""){
    alert("Please Enter Your Password")
}else if(password.length<6){
    alert("Password Must Be 6 Characters")
}else if(cpassword===""){
    alert("Please Enter Your Confirm Password")
}else if(password.length<6){
    alert("Confirm Password Must Be 6 Characters")
}else if(password !== cpassword){
    alert("Password and Confirm Password Must Match")
}else{
  console.log(image)
    console.log("User Registered Successfully")

    const formdata=new FormData()
    formdata.append("name",name)
    formdata.append("email",email)
    formdata.append("password",password)
    formdata.append("cpassword",cpassword)
    
    formdata.append("image",image)
    
console.log(formdata)
console.log("formdata")
try {
    let res=await axios.post(`${url}/signup`,formdata,{
      "Content-Type":"multipart/form-data"
    })
    console.log("res",res)
    if(res.status===201){
        toast.success(res.data.message)
        setInputData({...inputData,name:"",email:"",password:"",cpassword:""})
        setImage("")
        navigate("/login")

    }else{
        toast.error(res.data.error)
    }

} catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
}
}
}

useEffect(()=>{
  if(image){
    setPreview(URL.createObjectURL(image))
  }
},[image])
  return <>
  
 <section>
        <div className="form_data">
          <div className="form_heading">
            <h2>SignUp</h2>
            <img src={preview ? preview : "/shama.jpeg"} style={{height:50,borderRadius:10}}/>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={inputData.name} onChange={setData} />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={inputData.email} onChange={setData} />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!show ? "password" : "text"}
                  name="password"
                  id="password"
                  value={inputData.password}
                  onChange={setData}
                />
                <div className="showpass" onClick={() => setShow(!show)}>
                  {!show ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassshow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  value={inputData.cpassword}
                  onChange={setData}

                />
                <div
                  className="showpass"
                  onClick={() => setcpassShow(!cpassshow)}
                >
                  {!cpassshow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
<div className="form_input">
              <label htmlFor="image">Image</label>
              <input type="file"name="image"id="image"onChange={setImageFile}/>
            </div> 
            
            
            <button className="btn" onClick={handleSignUp}>SignUp</button>
            <p>
              Already have an account? <Link to="/login">LogIn</Link>
            </p>
          </form>
        </div>
      </section>
  </>
}

export default SignUp