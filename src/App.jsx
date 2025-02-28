import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Profilmemes from './pages/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemeUploader from "./components/Uploadmeme";
import MemeDetails from "./pages/MemeDetails";
import { ExploreMemes } from "./components/ExploreMemes";
import Allmemes from "./pages/Allmemes";

function App(){

 
  return (
    <div>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-memes" element={<Allmemes />} />
        <Route path="/explore-meme" element={<ExploreMemes/>}/>
        <Route path="/memes/:id" element={<MemeDetails />} />
        <Route path="/upload-meme" element={<MemeUploader />} />
        <Route path="/profile" element={<Profilmemes/>}>
          
        </Route> 
     </Routes> 
      <Footer/>
    </div>
  )
}

export default App; 