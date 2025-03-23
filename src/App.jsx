import React, { useEffect, useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom';
import HomePage from './Components/Home/HomePage'
import SignUp from './Components/Registration/SignUp';
import Login from './Components/Registration/Login';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import useStore from './Components/Store/Store'
import Logout from './Components/Registration/Logout';
import ZoneSelection from './Components/ZoneSelection/ZoneSelection';
import NotFound from './Components/NotFound';
import Purchase from './Components/Purchase/Purchase';

// export const DataContext = createContext({data:null});


function App() {
  const ActionAuthen = useStore((state)=>state.ActionAuthen);
  const Store = useStore();
  const [isLogin, setisLogin] = useState(false);
  
  const CurrentLocation = useLocation().pathname;
  let TitleLabel = 'bookingbara';

  if (CurrentLocation == '/Home' || CurrentLocation == '/') {
    TitleLabel = 'HomePage | '+TitleLabel;
  } else if (CurrentLocation == '/SignUp') {
    TitleLabel = 'SignUp | '+TitleLabel;
  } else if (CurrentLocation == '/Login') {
    TitleLabel = 'Login | '+TitleLabel;
  } else if (CurrentLocation.search(/EventDetail/)) {
    TitleLabel = 'EventDetail | '+TitleLabel;
  }

  const ProtectedRoute = ({ element }) => {
    var LOGIN_VERIFICATION = false;
    const currentTime = Date.now() / 1000;
    if(localStorage.getItem('expire') > currentTime){
      LOGIN_VERIFICATION = true;
      setisLogin(true);
    } else {
      LOGIN_VERIFICATION = false;
      setisLogin(false);
    }
    return LOGIN_VERIFICATION ? element : <Navigate to="/Login" />;
  };

  useEffect(() => {
    // checkAuth();

    ActionAuthen();
    

  }, [])
  
  

  return (
    <>
      <Helmet>
        <title>
          {TitleLabel}
        </title>
      </Helmet>
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/Home' element={<HomePage/>} />
        <Route path='/EventDetail/:EventID' element={<ProtectedRoute element={<ZoneSelection/>} />} />
        <Route path='/Login' element={!Store.IsLogin ? <Login/> : <Navigate to={'/Home'} />} />
        <Route path='/SignUp' element={!Store.IsLogin ? <SignUp/> : <Navigate to={'/Home'} />} />
        <Route path='/Purchase/:OrderID' element={<ProtectedRoute element={<Purchase/>}/>} />
        <Route path='/Logout' element={<Logout/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <h1>Hello</h1> */}
    </>
  )
}

export default App
