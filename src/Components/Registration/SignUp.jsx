import React, { useState } from "react";
import NavBar from '../NavigationBar/NavBar'
import 'flowbite'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const SignupForm = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  // const CreateSwal = withReactContent(Swal);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [DisableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateFirstname = (value) => value.trim().length >= 2;
  const validateLastname = (value) => value.trim().length >= 2;
  const validateUsername = (value) => /^[a-zA-Z0-9_]{8,50}$/.test(value);
  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  const validateConfirmPassword = (value, password) =>
    value === password;

  const validateField = (field, value) => {
    let isValid = false;
    switch (field) {
      case "firstname":
        isValid = validateFirstname(value);
        break;
      case "lastname":
        isValid = validateLastname(value);
        break;
      case "username":
        isValid = validateUsername(value);
        break;
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      case "confirmPassword":
        isValid = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: isValid ? "" : `Invalid ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleKeyUp = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const [ViewPassword, setViewPassword] = useState('password');

  const SubmitForm = async(e) => {
    e.preventDefault();
    setDisableButton(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_SERVER}/SignUp`, formData, 
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        });
        if(res.status == 201){
          console.log(res.data);
          setDisableButton(false);
  
          MySwal.fire({
            title: 'Success',
            text: 'This page will redirect !',
            icon: 'success',
          });
  
          // setTimeout(() => {
          //   navigate('/Login');
          // }, 1000);
        }
  
        if(res.status == 500){
          setDisableButton(false);
          MySwal.fire({
            title: Error,
            text: err.response.data,
            icon: 'error',
          });
        }
    } catch (error) {
      console.error(error);
    }
  

  }

  return (
    <>
        <NavBar/>
        <div className="bg-neutral-900 h-screen">
        <main className="pt-5 lg:px-10 xs:px-2 sm:px-2">
            <form className="lg:w-4/5 lg:pt-5 lg:mx-auto" onSubmit={SubmitForm}>
            <div className="grid lg:grid-cols-2 gap-3">
                <div className="mb-3 lg:mb-5">
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-white">
                        Firstname
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        className={`shadow-sm bg-gray-50 border ${
                        errors.firstname ? "border-red-500" : "border-gray-600"
                        } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}
                        placeholder="John"
                        value={formData.firstname}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        required
                    />
                    {errors.firstname && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                    )}
                </div>

                <div className="mb-3 lg:mb-5">
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-white">
                        Lastname
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        className={`shadow-sm bg-gray-50 border ${
                        errors.lastname ? "border-red-500" : "border-gray-600"
                        } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}
                        placeholder="Doe"
                        value={formData.lastname}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        required
                    />
                    {errors.lastname && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-3">
                <div className="mb-3 lg:mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className={`shadow-sm bg-gray-50 border ${
                        errors.username ? "border-red-500" : "border-gray-600"
                        } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}
                        placeholder="JohnDoe123"
                        value={formData.username}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        required
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>

                <div className="mb-3 lg:mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`shadow-sm bg-gray-50 border ${
                        errors.email ? "border-red-500" : "border-gray-600"
                        } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-3">
                <div className="mb-3 lg:mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                        Password
                    </label>
                    <input
                        type={ViewPassword}
                        id="password"
                        className={`shadow-sm bg-gray-50 border ${
                        errors.password ? "border-red-500" : "border-gray-600"
                        } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <div className="mb-3 lg:mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white">
                        Confirm Password
                    </label>
                    <input
                        type={ViewPassword}
                        id="confirmPassword"
                        className={`shadow-sm bg-gray-50 border ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-600"
                        } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        required
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                        </p>
                    )}
                </div>
            </div>

            <div class="flex items-start mb-5">
              <div class="flex items-center h-5">
                <input id="ViewPassword" type="checkbox" onClick={() => ViewPassword == 'password' ? setViewPassword('text') : setViewPassword('password')} class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>
              </div>
              <label htmlFor="ViewPassword" class="ms-2 text-sm font-medium text-white">Show Password</label>
            </div>

            <button
                disabled={DisableButton}
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500"
            >
                Sign up
            </button>
            </form>
        </main>
        </div>
    </>
  );
};

export default SignupForm;
