import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = (props) => {
  
  let navigate = useNavigate();
  const host = "http://localhost:4000/";
  const [passwordDetails, setpasswordDetails] = useState({ email: "", password: "", name: "" ,location:"", confirm_password:""})
  const onChange = (e) => {
    setpasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) navigate('/')
  
  
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();//synthetic event
    const username = passwordDetails.name;
    const email = passwordDetails.email;
    const password = passwordDetails.password;
    
    const confirm_password = passwordDetails.confirm_password;
    console.log(username)
    if (password === confirm_password){
    const response = await fetch(`${host}api/createUser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json"

      }, body: JSON.stringify({ username, email, password  })
    });
    const data = await response.json()
    console.log(data);
    if (data.status===true ) {
      //saving auth token in local storage and redirect


      navigate('/login')
      localStorage.setItem('chat-app-user', JSON.stringify(data))
    } else {
      navigate('/register')
      alert(data.msg)
    }
  }else {  alert("Password does not match") }
}

  return (<>
   <div className='h-full  bg-gradient-to-b from-black via-gray-800 to to-gray-700 p-8'>
      <form className='mx-8' >
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name" onChange={onChange} value={passwordDetails.name} required 
                placeholder="Full Name" />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email" onChange={onChange} value={passwordDetails.email} required
                placeholder="Email" />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password" onChange={onChange} value={passwordDetails.password} required
                placeholder="Password" />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password" onChange={onChange} value={passwordDetails.confirm_password} required
                placeholder="Confirm Password" />

              

              <button
                 onClick={handleSubmit}
                className="w-full btn-primary  text-center py-3 rounded btn-primary hover:bg-green-dark focus:outline-none my-1"
              >Create Account</button>
            </div>

            <div className="text-primary mt-6">
              Already have an account?
              <Link className="no-underline border-b border-blue text-white" to="/login">
                Log in
              </Link>.
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
   
  )
}


export default Signup