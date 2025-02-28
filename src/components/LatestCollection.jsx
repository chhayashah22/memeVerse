import { useEffect, useState } from "react";
import Title from "./Title";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LatestCollection() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMemes();
  }, []);

  const getMemes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      if (!response.ok) throw new Error("Failed to fetch memes");
      const data = await response.json();
      const storedData = JSON.parse(localStorage.getItem("memeData")) || {};

      const memesWithLikes = data.data.memes.slice(1, 13).map((meme) => ({
        ...meme,
        likes: storedData[meme.id]?.likes || 0,
      }));
      setMemes(memesWithLikes);
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (id, e) => {
    e.stopPropagation(); // Prevent navigating when clicking the like button
    setMemes((prevMemes) => {
      const updatedMemes = prevMemes.map((meme) =>
        meme.id === id ? { ...meme, likes: meme.likes + 1 } : meme
      );
      updateLocalStorage(updatedMemes);
      return updatedMemes;
    });
  };

  const updateLocalStorage = (memes) => {
    const memeData = memes.reduce((acc, meme) => {
      acc[meme.id] = { likes: meme.likes };
      return acc;
    }, {});
    localStorage.setItem("memeData", JSON.stringify(memeData));
  };

  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-5xl">
        <Title text1={"Latest"} text2={"COLLECTION"} />
        {loading ? (
          <div className="text-center text-lg font-semibold">Loading memes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {memes.map((meme, index) => (
              <motion.div
                key={meme.id}
                className="relative w-60 h-auto rounded-lg shadow-lg overflow-hidden cursor-pointer p-4 bg-white"
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                onClick={() => navigate(`/memes/${meme.id}`)}
              >
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <div className="text-center font-semibold py-2">{meme.name}</div>
                <div className="flex justify-between items-center px-4 py-2">
                  <button
                    onClick={(e) => handleLike(meme.id, e)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ❤️ {meme.likes}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LatestCollection;
