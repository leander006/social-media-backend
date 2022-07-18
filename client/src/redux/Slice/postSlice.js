import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allpost: null,
  followerPost:null,
  loading:false,
  error:false
}


export const PostSlice = createSlice({
      name: 'post',
      initialState,
      reducers: {
        postStart:(state) =>{
              state.loading=true
        },
        postSuccess:(state,action) =>{
            state.loading=false
            state.allpost= action.payload
        },
        postError:(state) =>{
            state.loading=false
            state.error=true
        },
        followerPostStart:(state) =>{
            state.loading=true
        },
        followerPostSuccess:(state,action) =>{
            state.loading=false
            state.allpost= action.payload
        },
        followerPostError:(state) =>{
            state.loading=false
            state.error=true
        },
      },
})
    
export const { postStart,postSuccess,postError,followerPostStart,followerPostSuccess,followerPostError} = PostSlice.actions


export default PostSlice.reducer    