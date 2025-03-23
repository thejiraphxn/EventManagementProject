import React, {useEffect, useState} from 'react'
import Logo from '../../assets/Logo/logo.png'
import { Link, useNavigate } from 'react-router-dom';
// import Authen from '../Authen/Authen';
import axios from 'axios';
import useStore from '../Store/Store'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const ActionAuthen = useStore((state)=>state.ActionAuthen);
    const Logout = useStore((state)=>state.Logout);
    const Store = useStore();
    const navigate = useNavigate();
    console.log(Store)

    useEffect(() => {

        // const GetUserData = async () => {
        //     const token = localStorage.getItem('token');
        //     if (token) {
        //         try {
        //             const response = await axios({
        //                 url: `${import.meta.env.VITE_API_SERVER}/getUserInformation`,
        //                 method: "POST",
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*",
        //                     "Content-Type": "application/json",
        //                     "Authorization": "Bearer " + token
        //                 },
        //             });
        //             if(response.status == 200){
        //                 setUserData(response.data.user);
        //             }
        //         } catch (err) {
        //             console.error('Error checking session', err);
                    
        //         }
        //     } 
        // };
        // GetUserData();
        // ActionAuthen();
    }, [])

    
    

    return (
        <>
            <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7 bg-neutral-900">
                <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto" aria-label="Global">
                    <div className="md:col-span-3 sm:w-1/3 md:w-full lg:w-full xs:w-2/3">
                        <a href="/Home" className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" aria-label="Preline">
                            <img src={Logo} className='' alt="" srcSet="" />
                        </a>
                    </div>
                    <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                        {
                            Store.IsLogin ? (
                                <>
                                    <Link to={'/Logout'} className="cursor-pointer xs:hidden py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500">
                                        {` Hi, ${Store.UserData.user_username}`}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={'/SignUp'} className="xs:hidden py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none border-neutral-700 hover:bg-white/10 text-white hover:text-white">
                                        Sign up
                                    </Link>
                                    <Link to={'/Login'} className="xs:hidden py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500">
                                        Login
                                    </Link> 
                                </>
                            )
                        }
                        <div className="md:hidden">
                            <button type="button" onClick={() => {isOpen ? setIsOpen(false) : setIsOpen(true)}} className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none text-white border-neutral-700 hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <line x1={3} x2={21} y1={6} y2={6} />
                                <line x1={3} x2={21} y1={12} y2={12} />
                                <line x1={3} x2={21} y1={18} y2={18} />
                                </svg>
                                    <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="navbar-collapse-with-animation" className={`${isOpen ? ('') : 'xs:hidden sm:hidden'}  hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6`}>
                        <ul className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                            <li>
                                <a className="inline-block text-black hover:text-gray-600 text-white hover:text-neutral-300" href="/">Home</a>
                            </li>
                            <li>
                                <a className="inline-block text-black hover:text-gray-600 text-white hover:text-neutral-300" href="#">Event</a>
                            </li>
                            <li>
                                <a className="inline-block text-black hover:text-gray-600 text-white hover:text-neutral-300" href="#">Ticket History</a>
                            </li>
                            <li>
                                <a className="inline-block text-black hover:text-gray-600 text-white hover:text-neutral-300" href="#">Careers</a>
                            </li>
                            <li>
                                <a className="inline-block text-black hover:text-gray-600 text-white hover:text-neutral-300" href="#">Blog</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
    }

export default NavBar
