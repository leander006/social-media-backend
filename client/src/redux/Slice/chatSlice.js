import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allChat: null,
  loading:false,
  error:false
}


export const ChatSlice = createSlice({
      name: 'chat',
      initialState,
      reducers: {
        chatStart:(state) =>{
              state.loading=true
        },
        chatSuccess:(state,action) =>{
            state.loading=false
            state.allChat= action.payload
        },
        chatError:(state) =>{
            state.loading=false
            state.error=true
        },
      },
})
    


export const { chatStart,chatSuccess,chatError} = ChatSlice.actions


export default ChatSlice.reducer    