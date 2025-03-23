import React from 'react'
import BG from '../../assets/Background/header.png'
import NavBar from '../NavigationBar/NavBar'
import ZoneSelect from '../ZoneSelection/ZoneSelection';
import Banner from '../../assets/Banner/guts.jpg'
import Carousel from '../Function/Carousel';
import Card from '../Function/Card';
import GutsPoster from '../../assets/Banner/guts_poster.png'

function Home() {
    const placeholder = 'https://placehold.jp/500x500.png';

    const GetLatestEvent = async() => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_SERVER}/GetLatestEvent`,
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
    }
    

    return (
        <>
            <NavBar/>
            <div className="bg-neutral-900 h-full">
                <main id="content">
                    <div className="pt-5 pb-3 px-4 lg:px-14 md:px-6">
                        <Carousel/>
                    </div>

                    <div className='max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-24 mx-auto'>
                        <div className="mb-6 sm:mb-10 max-w-2xl text-center mx-auto">
                            <h1 className="poppins-semibold text-white text-2xl sm:text-4xl ">
                                Latest Event
                            </h1>
                        </div>

                        <div className="grid sm:px-4 sm:grid-cols-2 xs:grid-cols-2 xs:px-4 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                            <Card src={GutsPoster} title='eYoga' description={'A revamped and dynamic approach to yoga analytics'} />
                            <Card src={placeholder} title='eYoga' description={'A revamped and dynamic approach to yoga analytics'} />
                            <Card src={placeholder} title='eYoga' description={'A revamped and dynamic approach to yoga analytics'} />
                            <Card src={placeholder} title='eYoga' description={'A revamped and dynamic approach to yoga analytics'} />
                            <Card src={placeholder} title='eYoga' description={'A revamped and dynamic approach to yoga analytics'} />
                            <Card src={placeholder} title='eYoga' description={'A revamped and dynamic approach to yoga analytics'} />
                        </div>
                    </div>


                </main>
            </div>

            
        </>
    );

}

export default Home
