import { useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
// import BookCard from "../components/BookCard";
// import Loader from "../components/Loader";
import {motion} from 'framer-motion';
import { useNavigate } from "react-router-dom";

function Allmemes(){
    const navigate=useNavigate()
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getMemes = async () => {
        setLoading(true);
        try {
          const response = await fetch("https://api.imgflip.com/get_memes");
          const data = await response.json();
          setMemes(data.data.memes); 
          console.log(data.data.memes)
        } catch (error) {
          console.error("Error fetching memes:", error);
        }
        setLoading(false);
      };
    useEffect(()=>{
        getMemes()
    },[]);

    return (
        <div className=" bg-zinc-900 text-white px-10 py-8">
  <Title text1={"ALL"} text2={"COLLECTION"} />
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {memes.map((meme, index) => (
      <motion.div
        key={meme.id}
        className="relative w-60 h-72 rounded-lg shadow-lg overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.2,
          type: "spring",
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}  onClick={() => navigate(`/memes/${meme.id}`)}
      >
        {/* Meme Image */}
        <img
          src={meme.url}
          alt={meme.name}
          className="w-full h-60 object-cover rounded-lg"
        />

        {/* Meme Title - Overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm sm:text-lg font-semibold text-center py-2">
          {meme.name}
        </div>
      </motion.div>
    ))}
  </div>
</div>
    )
}

export default Allmemes;