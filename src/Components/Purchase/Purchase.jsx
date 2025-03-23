import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'flowbite'
import NavBar from '../NavigationBar/NavBar';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useStore from '../Store/Store'
import Logo from '../../assets/Logo/logo.png'

const Purchase = () => {
    const navigate = useNavigate();
    const {OrderID} = useParams();
    const Store = useStore();
    const [OrderData, setOrderData] = useState({});
    const [TicketMethod, setTicketMethod] = useState('E-Ticket');

    const GetOrderData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/GetOrder/${OrderID}/${Store.UserData.user_generate_id}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        if(res.status == 200){
          if(res.data.Status == true){
              // setOrderData();
              console.log(res.data);
          }
        }
      } catch (err) {
        console.error(err);
        // navigate('/Home');
      }
    };

    useEffect(() => {
      GetOrderData();

      

    }, [OrderID])
    


    return (
        <>
          <div className="bg-neutral-900 h-screen">
            <header>
              <div className="lg:px-8 lg:w-1/5 md:px-6 md:w-2/5 sm:px-4 sm:w-3/5 xs:px-4 xs:w-3/5 justify-self-center lg:pt-16 md:pt-14 sm:pt-8 xs:pt-6">
                  <img className="" src={`${Logo}`} alt="image description"/>
              </div>
            </header>

            <section>
              <div className="lg:px-10 lg:w-2/5 md:px-6 md:w-2/5 sm:px-4 sm:w-3/5 xs:px-4 xs:w-full py-4 xs:px-2 justify-self-center">
                <h3 className="text-white py-4 text-center lg:text-xl md:text-lg text-base">
                  Checkout you ticket !
                </h3>

                <div className='py-4'>
                  <label className="text-white text-center text-md text-base pb-2">Receive ticket</label>
                  <ul className="w-full text-sm font-medium border rounded-xl bg-transparent focus:ring-lime-500 focus:border-lime-500 text-white">
                    <li className="w-full rounded-lg border-gray-600">
                      <div className="flex items-center ps-3">
                        <input id="vue-checkbox" type="radio" checked={TicketMethod == 'E-Ticket' ? true : false} onClick={() => setTicketMethod('E-Ticket')}  className="w-4 h-4 text-lime-500 bg-gray-100 border-gray-300 rounded-xl focus:ring-lime-500 focus:ring-2" />
                        <label htmlFor="vue-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-300">E-Ticket</label>
                      </div>
                    </li>
                  </ul>
                </div>

                <label htmlFor="simple-search" className="sr-only text-white">Search</label>
                <div className="relative w-full py-4">
                  <input type="text" id="simple-search" className="w-full bg-gray-50 border border-gray-300 text-white text-sm rounded-xl bg-transparent focus:ring-lime-500 focus:border-lime-500 block py-3" placeholder="Search branch name..." required />
                </div>
              </div>
            </section>
          </div>
        </>
    )
}

export default Purchase
