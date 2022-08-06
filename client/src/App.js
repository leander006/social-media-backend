import Explore from './Components/Pages/Explore'

import Home from "./Components/Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import axios from 'axios';
import LikedPost from './Components/Pages/LikedPost';
import SavedPost from "./Components/Pages/SavedPost"
import Profile from "./Components/Pages/Profile"
import SinglePage from './Components/Pages/SinglePage';
import Chat from './Components/Pages/Chat';
import Write from './Components/Pages/Write';
import Edit from './Components/Pages/Edit';

axios.defaults.withCredentials= true;


function App() {
  
  return (


   <Router>
   <Routes> 
   
   <Route exact path="/" element={<Login/>}/>
   <Route path="/home" element={<Home/>}/>
   <Route path="/like" element={<LikedPost/>}/>
   <Route path="/profile/:userId" element={<Profile/>}/>
   <Route path="/savedPost" element={<SavedPost/>}/>
   <Route path="/chat" element={<Chat/>}/>
   <Route path="/explore" element={<Explore/>}/>
   <Route path="/write" element={<Write/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/edit/:editId" element={<Edit/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/singlepage/:postId" element={<SinglePage/>}/>
  </Routes>
 </Router>
  );
}

export default App;
