import { createSlice } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';


const initialState = {
      
  currentUser: JSON.parse(localStorage.getItem("user")),
//   currentUser:JSON.parse(Cookies.get('data')),
  loading:false,
  error:false
}


export const UserSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
        loginStart:(state) =>{
              state.loading=true
        },
        loginSuccess:(state,action) =>{
            state.loading=false
            state.currentUser= action.payload
        },
        loginError:(state) =>{
            state.loading=false
            state.error=true
        },
        logout:(state) =>{
              state.currentUser=null;
              state.loading= false;
              state.error=false;
              localStorage.removeItem("user")
        }
      },
    })
    


export const { loginStart,loginSuccess,loginError,logout} = UserSlice.actions


export default UserSlice.reducer    