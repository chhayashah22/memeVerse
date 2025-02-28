import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import Title from "./Title";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ExploreMemes = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [category, setCategory] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      if (data.success) {
        const storedData = JSON.parse(localStorage.getItem("memeData")) || {};
        const memesWithLikes = data.data.memes.map((meme) => ({
          ...meme,
          likes: storedData[meme.id]?.likes || 0,
        }));
        setMemes(memesWithLikes);
        setFilteredMemes(memesWithLikes);
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (!query) {
        setFilteredMemes(memes);
      } else {
        const searchResults = memes.filter((meme) =>
          meme.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMemes(searchResults);
      }
    }, 500),
    [memes]
  );

  useEffect(() => {
    let sortedMemes = [...memes];
    if (category === "Trending") {
      sortedMemes.sort((a, b) => b.height - a.height);
    } else if (category === "New") {
      sortedMemes = sortedMemes.slice().reverse();
    } else if (category === "Classic") {
      sortedMemes = sortedMemes.filter((meme) => meme.width > meme.height);
    }
    setFilteredMemes(sortedMemes);
  }, [category, memes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleLike = (id) => {
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
    <div className="bg-zinc-900 text-white p-8">
      <Title text1={"Explore"} text2={"Memes"} />
      <input type="text"  placeholder="Search memes..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border rounded text-black"
      />
      <div className="flex gap-4 mb-4">
        {["Trending", "New", "Classic"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${
              category === cat ? "bg-gray-500 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => (
            <motion.div
              key={meme.id}
              className="border rounded-lg overflow-hidden p-4 bg-white text-black"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/memes/${meme.id}`)}
            >
              <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover" />
              <p className="p-2 text-center bg-black bg-opacity-60 text-white">{meme.name}</p>
              <div className="flex justify-center items-center mt-2">
                <button onClick={() => handleLike(meme.id)} className="text-red-500 text-2xl">
                  ❤️ {meme.likes}
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400">No memes found.</p>
        )}
      </div>
    </div>
  );
};
