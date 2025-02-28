import { useEffect, useState } from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Allmemes() {
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState({});

  // Fetch memes from API
  const getMemes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      setMemes(data.data.memes);

      // Load likes from localStorage
      const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
      setLikes(storedLikes);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMemes();
  }, []);

  // Handle Like Button
  const handleLike = (memeId) => {
    const updatedLikes = { ...likes, [memeId]: (likes[memeId] || 0) + 1 };
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  };

  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      <Title text1={"ALL"} text2={"COLLECTION"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {memes.map((meme, index) => (
          <div key={meme.id} className="flex flex-col items-center">
            <motion.div
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
              }}
              onClick={() => navigate(`/memes/${meme.id}`)}
            >
              {/* Meme Image */}
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-60 object-cover rounded-lg"
              />

              {/* Meme Title */}
              <div
                className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white 
              text-sm sm:text-lg font-semibold text-center py-2"
              >
                {meme.name}
              </div>
            </motion.div>

            {/* Like Button (Below Meme) */}
            <button
              className="mt-2 text-red-500 text-lg bg-gray-800 px-3 py-1 rounded-md"
              onClick={() => handleLike(meme.id)}
            >
              ❤️ {likes[meme.id] || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allmemes;
