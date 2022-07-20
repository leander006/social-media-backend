import Explore from './Components/Pages/Explore'
import Chats from "./Components/Pages/Chats";
import Home from "./Components/Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import axios from 'axios';

axios.defaults.withCredentials= true;


function App() {
  return (

    // <Navbar/>
    // <Home/>
    // <Chats/>


   <Router>
   <Routes> 
     
   <Route exact path="/" element={<Login/>}/>
   <Route path="/home" element={<Home/>}/>
   <Route path="/chat" element={<Chats/>}/>
   <Route path="/message/:chatId" element={<Chats/>}/>
   <Route path="/explore" element={<Explore/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   {/* <Route path="/followers" element={Followers}/>
   <Route path="/yourposts" element={<Chats/>}/>
   <Route path="/likedpost" element={<Chats/>}/> */}
   {/* <Route exact path="/login" element={<Login/>}/>
   <Route exact path="/register" element={<Register/>}/>  */}

  </Routes>
 </Router>
  );
}

export default App;
