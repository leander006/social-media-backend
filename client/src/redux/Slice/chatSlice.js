import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allChat: [],
  chatloading:false,
  error:false,
  notification:[],
  currentChat:false,
}



export const ChatSlice = createSlice({
      name: 'chat',
      initialState,
      reducers: {
        chatStart:(state) =>{
              state.chatloading=true
        },
        chatSuccess:(state,action) =>{
            state.chatloading=false
            state.allChat= action.payload
        },
        chatError:(state) =>{
            state.chatloading=false
            state.error=true
        },
        setNotification:(state,action)=>{
          state.notification=action.payload
        },
        setCurrentChat:(state,action)=>{
          state.currentChat=action.payload
        }
      },
})
    


export const { chatStart,chatSuccess,chatError,setNotification,setCurrentChat} = ChatSlice.actions


export default ChatSlice.reducer    