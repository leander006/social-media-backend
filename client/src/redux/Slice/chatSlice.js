import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allChat: [],
  chatloading:false,
  error:false
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
      },
})
    


export const { chatStart,chatSuccess,chatError} = ChatSlice.actions


export default ChatSlice.reducer    