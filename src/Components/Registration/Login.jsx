import React, { useState, useContext } from 'react'
import axios from 'axios'
import LoginValidation from '../Function/Validation'
import NavBar from '../NavigationBar/NavBar'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useStore from '../Store/Store'


export default function Login() {
    const SetLogin = useStore((state)=>state.SetLogin);
    const Store = useStore();
    const MySwal = withReactContent(Swal);
    const [DisableButton, setDisableButton] = useState(false);
    const [Values, setValues] = useState({
        username_or_email: "",
        password: "",
    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const navigate = useNavigate();
    const [Errors, setErrors] = useState({})
    const [AlertHeaderError, setAlertHeaderError] = useState({})
    const [AlertHeaderSuccess, setAlertHeaderSuccess] = useState("")
    axios.default.withCredentials = true;
    const handleSubmit = async(event) =>{
        event.preventDefault();
        setErrors(LoginValidation(Values));
        console.log(Errors);

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_SERVER}/Login`, Values, 
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
              }
            });
            if(res.status == 200){
              console.log(res.data);
              setDisableButton(false);
              setAlertHeaderError({errors: [""]})
              setAlertHeaderSuccess(res.data.message);
              SetLogin(res);
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('expire', res.data.decoded.exp);
              localStorage.setItem('isLogin', true);
              MySwal.fire({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
              });
              setTimeout(() => {
                navigate('/Home');
              }, 500);
            } else{
                localStorage.removeItem('token');
            }
      
            if(res.status == 400){
                setDisableButton(false);
                setAlertHeaderSuccess("");
                setAlertHeaderError(res.data.message);
                MySwal.fire({
                    title: 'Error',
                    text: err.response.data,
                    icon: 'error',
                });
            }
      } catch (error) {
        console.error(error)
        
        if(Object.entries(error.response.data)?.length > 0){
            MySwal.fire({
                title: 'Error',
                text: error.response.data.errors[0],
                icon: 'error',
            });
        } else{
            MySwal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
            });
        }
      }

    }


    const [ViewPassword, setViewPassword] = useState('password');
    const handleCheckboxChange = () => {
      setShowPasswords(!showPasswords);
    };
  

  return (
  <>
    <NavBar />
    <div className="bg-neutral-900 h-screen">
      <main className='pt-5 lg:px-10 xs:px-2 sm:px-2'>
            <form className="lg:pt-5 lg:mx-auto lg:w-2/6" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor='username_or_email' className="block mb-2 text-sm font-medium text-white">Email or Username</label>
                <input type='text' onChange={handleInput} name="username_or_email" placeholder="JohnDoe123" 
                className={`shadow-sm bg-gray-50 border ${
                Errors.username_or_email ? "border-red-500" : "border-gray-600"
                } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}/>
                {Errors.username_or_email && <div className="form-text text-danger">{Errors.username_or_email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                <input type={ViewPassword} onChange={handleInput} name="password" placeholder="Password" 
                className={`shadow-sm bg-gray-50 border ${
                Errors.password ? "border-red-500" : "border-gray-600"
                } text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white`}
                />
                {Errors.password && <div className="form-text text-danger">{Errors.password}</div>}
              </div>
              
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="ViewPassword" type="checkbox" onClick={() => ViewPassword == 'password' ? setViewPassword('text') : setViewPassword('password')} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>
                    </div>
                    <label for="ViewPassword" className="ms-2 text-sm font-medium text-white">Show Password</label>
                </div>

                <button
                    disabled={DisableButton}
                    type="submit"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500"
                >
                    Login
                </button>
            </form>

      </main>
    

        
    </div>

    </>
  )
}
