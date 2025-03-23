import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";

export function ModalAvailableZones({ShowTimeID}) {
  const [openModal, setOpenModal] = useState(false);
  const [DataZoneAvailable, setDataZoneAvailable] = useState({});
  const [DisabledButton, setDisabledButton] = useState(true);


  const CheckAvailableZone = async(ShowTimeID) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/CheckAvailableZone/${ShowTimeID}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        if(res.status == 200){
          if(res.data.Status == true){
            console.log(res.data);
            setDataZoneAvailable(res.data.Result);
          }
        }
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(() => {
    CheckAvailableZone(ShowTimeID);
    console.log(ShowTimeID);
  
    if(ShowTimeID){
        setDisabledButton(false)
    }

  }, [ShowTimeID])
  

  return (
    <>
        <button onClick={() => setOpenModal(true)} disabled={DisabledButton} className="w-full px-5 text-center py-2.5 font-medium text-black inline-block rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500">
            Available Zones
        </button>
        <Modal show={openModal} onClose={() => setOpenModal(false)} className="bg-gray-800">
            <Modal.Header>Avaiable Zones</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <ul className="space-y-4 justify-self-center text-left text-gray-500 dark:text-gray-400">
                        <li className="grid grid-cols-3 lg:grid-cols-6 gap-y-5 items-center rtl:space-x-reverse">
                            {
                                Object.entries(DataZoneAvailable)?.map(Item => (
                                    <div className="grid grid-cols-3 justify-self-center font-medium">
                                        <span className="ps-3 pe-2">
                                            {Item[0]}
                                        </span>
                                        <span className="ps-2 pe-2">
                                            :
                                        </span>
                                        <span className={`pe-3 ${Item[1] > 0 ? 'text-lime-500' : 'text-red-500'}`}>
                                            {Item[1]}
                                        </span>
                                    </div>
                                    // <CheckIcon className="text-lime-500" />
                                ))
                            }
                        </li>
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="px-5 text-center py-2.5 font-medium text-black inline-block rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500" onClick={() => CheckAvailableZone(ShowTimeID)}>
                    Load
                </button>
                <button className="px-5 text-center py-2.5 font-medium inline-block items-center gap-x-2 font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none border-neutral-700 hover:bg-white" onClick={() => setOpenModal(false)}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
