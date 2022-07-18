import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allmessage: null,
  loading:false,
  error:false
}


export const MessageSlice = createSlice({
      name: 'message',
      initialState,
      reducers: {
        messageStart:(state) =>{
              state.loading=true
        },
        messageSuccess:(state,action) =>{
            state.loading=false
            state.allmessage= action.payload
        },
        messageError:(state) =>{
            state.loading=false
            state.error=true
        },
        getMessageStart:(state) =>{
          state.loading=true
        },
        getMessageSuccess:(state,action) =>{
        state.loading=false
        state.allmessage= [...state.allmessage,action.payload]
        },
        getMessageError:(state) =>{
        state.loading=false
        state.error=true
        },
      },
})
    


export const { messageStart,messageSuccess,messageError,getMessageError,getMessageSuccess,getMessageStart} = MessageSlice.actions


export default MessageSlice.reducer    