import axios from 'axios';
import React from 'react'
import {create} from 'zustand'


const Store = (set) => ({
    UserData: {},
    Token: null,
    IsLogin: false,
    SetLogin: (Values) => {
        set({
            UserData: Values.data.decoded,
            Token: Values.data.token,
            IsLogin: true
        })
    },
    ActionAuthen: async() => {
        const token = localStorage.getItem('token');
        if(token){
            try {
                const response = await axios({
                  url: `${import.meta.env.VITE_API_SERVER}/authen`,
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`,
                      },
                  });
            
                  if (response.status === 200) {
                        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
                        const expireTime = response.data.decoded.exp;
    
                        set({
                            UserData: response.data.decoded,
                            Token: response.data.token,
                            IsLogin: true
                        })
                
                        localStorage.setItem('expire', expireTime);
                        localStorage.setItem('isLogin', true);
                
                        if (expireTime < currentTime) {
                                localStorage.removeItem('token');
                                localStorage.removeItem('expire');
                                localStorage.removeItem('isLogin');
                                set({
                                    UserData: null,
                                    Token: null,
                                    IsLogin: false
                                })
                                return false;
                        }
                
                        return true;
                  }
              } catch (err) {
                console.error("Authentication failed:", err.message);
                return false;
              }
        } else{
            set({
                UserData: null,
                Token: null,
                IsLogin: false
            })
            return false;
        }      
    },
    Logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        localStorage.removeItem('isLogin');
        set({
            UserData: null,
            Token: null,
            IsLogin: false
        })
        return true
    },
    CheckLogin: () => {
        const token = localStorage.getItem('token');
        if(token){
            const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
            const expireTime = localStorage.getItem('expire');
            if (expireTime < currentTime) {
                localStorage.removeItem('token');
                localStorage.removeItem('expire');
                localStorage.removeItem('isLogin');
                set({
                    UserData: null,
                    Token: null,
                    IsLogin: false
                })
                return false;
            }
            return localStorage.getItem('isLogin');
        } else{
            return false;
        }
    }
})

const useStore = create(Store);

export default useStore;