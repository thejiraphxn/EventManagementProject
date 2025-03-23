import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ImageMapper from "react-img-mapper";
import axios from 'axios';
import 'flowbite'
import NavBar from '../NavigationBar/NavBar';
import PosterPlaceholder from '../../assets/Placeholder/poster-placeholder.jpg'
import { ModalAvailableZones } from './ModalAvailableZones';
import Seatmap from '../../assets/Placeholder/seatmap-placeholder.jpg'
import moment from 'moment';
import LivingIcon from '@mui/icons-material/Living';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useStore from '../Store/Store';



export default function ZoneSelection() {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const {EventID} = useParams();
    const [DataInDateSelected, setDataInDateSelected] = useState(null);
    const [SeatUnavailable, setSeatUnavailable] = useState([]);
    const [SeatAvailable, setSeatAvailable] = useState({});
    const [EventData, setEventData] = useState([]);
    const [SeatsSelected, setSeatsSelected] = useState([]);
    const Store = useStore();
    const [Images, setImages] = useState({
        emg_poster: {
            content: PosterPlaceholder
        },
        emg_seatmap: {
            content: Seatmap
        }
    });
    const MAP = {
        name: "map",
        areas: EventData?.evt_map,
    };

    const handleClick = (ZoneSelected) => {
        console.log(ZoneSelected.id);
        GetSeatAvailable(ZoneSelected.id);
    };

    const MakingPayment = async () => {
        if(SeatsSelected?.length === 0){
            MySwal.fire({
                title: 'Error',
                text: 'Please select a seat',
                icon: 'error',
            });
            return;
        }
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_SERVER}/BookSeatArray`,
            {
              UserID: Store.UserData.user_generate_id,
              SeatID: SeatsSelected
            },{
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
            });
            if(res.status == 200){
                if(res.data.Status == true){
                    console.log(res)
                    navigate(`/Purchase/${res.data.Data.OrderID}`);
                } else{
                    MySwal.fire({
                        title: 'Error',
                        text: res.data.Message,
                        icon: 'error',
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const GetEventData = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/EventData/${EventID}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          });
          if(res.status == 200){
            if(res.data.Status == true){
                setEventData(res.data.EventData);
                console.log(res.data.EventData);
            }
          }
        } catch (err) {
          console.error(err);
          navigate('/Home');
        }
    };

    const GetImage = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/EventImages/${EventID}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          });
          if(res.status == 200){
            if(res.data.Status == true){
                setImages(res.data.EventImages);
                console.log(res.data.EventImages)
            }
          }
        } catch (err) {
          console.error(err);
        }
    };

    const GetSeatAvailable = async (ZoneSelected) => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/ShowSeatAvailable/${DataInDateSelected}/${ZoneSelected}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          });
          if(res.status == 200){
            if(res.data.Status == true){
                console.log(res.data);
                setSeatAvailable(res.data);
            }
          }
        } catch (err) {
          console.error(err);
        }
    };

    const CheckAvailableSeat = async(SeatID) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/CheckSeatAvailable/${SeatID}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
            });
            if(res.status == 200){
                if(res.data.Status == true){
                    console.log(res.data);
                    if(res.data.ASeatAvailable.as_available == false || res.data.ASeatAvailable.as_available == 0){
                        setSeatUnavailable(oldArr => [...oldArr, res.data.ASeatAvailable.as_self_id]);
                    } 

                    if(res.data.ASeatAvailable.as_available == true || res.data.ASeatAvailable.as_available == 1){
                        // console.log(SeatsSelected);
                        if(SeatsSelected.length < 6 && !SeatsSelected.includes(res.data.ASeatAvailable.as_self_id)){
                            const removeValInArray = SeatUnavailable.filter(item => item !== res.data.ASeatAvailable.as_self_id);
                            setSeatUnavailable(removeValInArray);
                            setSeatsSelected(oldArr => [...oldArr, res.data.ASeatAvailable.as_self_id]);
                        } else{
                            MySwal.fire({
                                title: 'Error',
                                text: 'You cannot select more than 6 seats',
                                icon: 'error',
                            });
                        }
                        
                    } 
                } else{
                    setSeatUnavailable(oldArr => [...oldArr, SeatID]);
                }
            }
          } catch (err) {
            console.error(err);
          }
    }

    const CancelSeatSelected = (SeatID) => {
        if(SeatsSelected.includes(SeatID)){
            const removeValInArray = SeatsSelected.filter(item => item !== SeatID);
            console.log(removeValInArray)
            setSeatsSelected(removeValInArray);
        }
    }

    const DateOnSelected = (e) => {
        // console.log(e.target.value);
        setDataInDateSelected(e.target.value);
    }

    useEffect(() => {
        GetEventData();
        GetImage();
    }, [])

    return (
        <>
            <NavBar/>
            <div className="bg-neutral-900 h-screen">
                <main>

                    <header>
                        <div className="lg:px-8 w-full">
                            <img className="h-auto rounded-lg lg:w-4/5 md:w-4/5 xs:px-2 md:w-4/5 sm:w-5/6 justify-self-center" src={`${Images.emg_poster.content}`} alt="image description"/>
                        </div>
                    </header>

                    <section>
                        <div className="lg:px-8 w-full py-4 xs:px-2">
                            <div className="bg-neutral-800 h-20 lg:w-4/5 md:w-4/5 xs:w-full md:w-4/5 sm:w-5/6 justify-self-center rounded-lg">
                                <div className="flex lg:flex-cols-2 gap-x-3 px-3">
                                    <div className="w-2/3 xs:w-3/5 py-4">
                                        
                                        <select onChange={DateOnSelected} id="DateShowTime" className="w-full bg-gray-50 border border-gray-300 text-white text-sm rounded-xl bg-transparent focus:ring-lime-500 focus:border-lime-500 block py-3">
                                            <option selected value='no select'>Choose a date</option>
                                            {
                                                EventData.ShowTime?.map((list, i) => (
                                                    <>
                                                        <option key={i} value={list.est_self_id}>{moment(list.est_showdate).format('dddd D MMMM YYYY h:mm:ss a')}</option>
                                                    </>
                                                ))
                                            }
                                        </select>

                                    </div>
                                    <div className="w-1/3 xs:w-2/5 py-4">
                                        <ModalAvailableZones ShowTimeID={DataInDateSelected} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        {
                            DataInDateSelected !== null && DataInDateSelected !== 'no select' ? (
                            <>
                                <div className='px-4 xs:px-0 sm:px-6 lg:px-6 py-6 lg:py-10 bg-black'>
                                    <h3 className="text-center text-white py-6">
                                        {
                                            SeatAvailable?.SeatZoneSelected === undefined ? (
                                                'Click or Tap on image for select a zone you need .'
                                            ) : (
                                                `You are choosing ${SeatAvailable?.SeatZoneSelected}`
                                            )
                                        }
                                    </h3>   
                                    <div className="lg:flex w-full md:grid justify-self-center lg:w-4/5 px-2">
                                        <div className="lg:flex w-1/2 justify-start py-3">
                                            <ImageMapper
                                                src={`${Images.emg_seatmap.content}`}
                                                map={MAP}
                                                width="500"
                                                onClick={handleClick}
                                            />
                                        </div>
                                        <div className="lg:flex lg:w-1/2 bg-neutral-800 rounded-xl xs:px-3 xs:py-3 sm:py-4 sm:px-4 md:px-4 md:py-4 lg:px-6 lg:py-6">
                                            {
                                                SeatAvailable?.SeatAvailable?.length > 0 ? (
                                                    <div className="grid lg:gap-x-8 lg:gap-y-4 md:gap-x-4 md:gap-y-6 sm:gap-x-3 sm:gap-y-6 xs:gap-x-4 xs:gap-y-8 text-center grid-cols-10">
                                                    {
                                                        SeatAvailable?.SeatAvailable?.map((SeatItem, i) => (
                                                            <>
                                                                {
                                                                    SeatUnavailable.includes(SeatItem.as_self_id) ? (
                                                                        // <div className='text-white cursor-pointer bg-red-500 h-4/6 rounded' onClick={() => CheckAvailableSeat(SeatItem.as_self_id)}>{SeatItem.as_seat_number}</div>
                                                                        <LivingIcon className='cursor-pointer text-red-500' onClick={() => CheckAvailableSeat(SeatItem.as_self_id)}/>
                                                                    ) : SeatsSelected.includes(SeatItem.as_self_id) ? (
                                                                        <CheckCircleIcon className='cursor-pointer text-amber-400' onClick={() => CancelSeatSelected(SeatItem.as_self_id)} />
                                                                    ) : SeatItem.as_available == 0 ? (
                                                                        // <div className='text-white cursor-pointer bg-red-500 h-4/6 rounded' onClick={() => CheckAvailableSeat(SeatItem.as_self_id)}>{SeatItem.as_seat_number}</div>
                                                                        <LivingIcon className='cursor-pointer text-red-500' onClick={() => CheckAvailableSeat(SeatItem.as_self_id)}/>
                                                                    ) : (
                                                                        // <div className='text-white cursor-pointer bg-cyan-500 h-4/6 xs:h-full rounded' onClick={() => CheckAvailableSeat(SeatItem.as_self_id)}>{SeatItem.as_seat_number}</div>
                                                                        <LivingIcon className='cursor-pointer text-cyan-500' onClick={() => CheckAvailableSeat(SeatItem.as_self_id)}/>
                                                                    )
                                                                }
                                                            </>
                                                        ))
                                                    }
                                                    </div>
                                                ) : (
                                                    <h1 className='w-full text-center content-center text-white'>Please choose a zone for view available seat</h1>
                                                )
                                            }

                                                {/* <LivingIcon className='text-red-900'/> */}
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-center content-center max-w-full lg:w-1/2">
                                    </div>
                                </div>
                        </>
                            ) : (
                                <>
                                    <div className='px-4 xs:px-0 sm:px-6 lg:px-6 py-6 lg:py-10 bg-black'>
                                        <h3 className="text-center text-white py-3">
                                            Please select show date .
                                        </h3>  
                                    </div>
                                </>
                            )
                        }
                    </section>

                    <section>
                        <div className="lg:px-8 w-full py-4 xs:px-2 bg-black">
                            <div className="h-20 lg:w-4/5 md:w-4/5 xs:w-full md:w-4/5 sm:w-5/6 justify-self-center rounded-lg">
                                <div className="w-full py-4 justify-item-end">
                                    <button disabled={SeatsSelected.length > 0 ? false : true} onClick={() => MakingPayment()} className="w-full px-5 text-center py-2.5 font-medium text-black inline-block rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>


                </main>
            </div>
            
        </>
    )
}
