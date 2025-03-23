import React, { useEffect } from 'react'
import useStore from '../Store/Store'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const Logout = useStore((state)=>state.Logout);
    const navigate = useNavigate();


    useEffect(() => {
      Logout();
      navigate('/Home');
    }, [])
    

    return (
        <>
            <p>Logout</p>
        </>
    )
}

export default Logout
