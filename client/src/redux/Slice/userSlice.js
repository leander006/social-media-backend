import { createSlice } from '@reduxjs/toolkit'
import Cookie from "js-cookie"


const initialState = {
  currentUser: Cookie.get("token")?JSON.parse(Cookie.get('data')):null,
  loading:false,
  error:false,
  click:false,
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
              Cookie.remove("token")
              Cookie.remove("data")
        },
        clicked:(state)=>{
            state.loading=false
            state.click=!state.click
        },
      },
})
    


export const { loginStart,loginSuccess,loginError,logout,clicked} = UserSlice.actions


export default UserSlice.reducer    