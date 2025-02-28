import React, { useState, useEffect } from "react";

const ProfileMemes = () => {
  const [savedMemes, setSavedMemes] = useState([]);

  useEffect(() => {
    const memes = JSON.parse(localStorage.getItem("memes")) || [];
    setSavedMemes(memes);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Your Uploaded Memes</h2>

      {savedMemes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {savedMemes.map((meme, index) => (
            <div key={index} className="relative border rounded-lg overflow-hidden">
              <img src={meme.memeUrl} alt="Uploaded Meme" className="w-full h-auto" />
              <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-60 p-2 rounded text-sm">
                {meme.caption}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No memes uploaded yet.</p>
      )}
    </div>
  );
};

export default ProfileMemes;
