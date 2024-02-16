import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = (props) => {
  let navigate = useNavigate();
  const host = "http://localhost:4000/";
  const [passwordDetails, setpasswordDetails] = useState({ email: "", password: "", name: "" ,location:"", confirm_password:""})
  const onChange = (e) => {
    setpasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();//synthetic event
    const name = passwordDetails.name;
    const email = passwordDetails.email;
    const password = passwordDetails.password;
    const location = passwordDetails.location;
    const confirm_password = passwordDetails.confirm_password;
    if (password === confirm_password){
    const response = await fetch(`${host}api/createUser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json"

      }, body: JSON.stringify({ name, email, password , location })
    });
    const json = await response.json()
    console.log(json);
    if (json.success==='true' ||json.success===true ) {
      //saving auth token in local storage and redirect


      navigate('/login')
      console.log(json)
    } else {
      navigate('/signup')
      alert("Enter valid credentials")
    }
  }else {  alert("Password does not match") }
}

  return (
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

              <input
                type="location"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="location" onChange={onChange} value={passwordDetails.location}
                placeholder="location" />

              <button
                type="button" onClick={handleSubmit}
                className="w-full bg-primary-700 text-center py-3 rounded btn-primary hover:bg-green-dark focus:outline-none my-1"
              >Create Account</button>
            </div>

            <div className="text-white mt-6">
              Already have an account?
              <Link className="no-underline border-b border-blue text-white" to="/login">
                Log in
              </Link>.
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}


export default Signup