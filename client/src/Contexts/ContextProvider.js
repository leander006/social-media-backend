import axios from "axios";
import { createContext,useContext, useEffect, useState} from "react";

export const Context = createContext();

const ContextProvider =({children}) =>{
const [user, setUser] = useState("");
const [questions, setQuestions] = useState([])
const [comments, setComments] = useState([])
const [replies, setReplies] = useState([])
const [answer, setAnswer] = useState("")

const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
    }
  }

  useEffect(() => {
    const getQuestions = async() =>{
  
        try {
            
            const res= await axios.get("http://localhost:3003/api/question",config);
         
          setQuestions(res.data);
            
        } catch (error) {
            console.log(error);
        }
    };
    getQuestions();
 
},[user])

useEffect(() => {
    
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
},[] )




    return < Context.Provider value={{user,setUser,questions, setQuestions,comments, setComments,replies, setReplies,answer, setAnswer}}>{children}</Context.Provider>
}

export const ContextState = () =>{
    return useContext(ContextProvider);
}


export default ContextProvider;