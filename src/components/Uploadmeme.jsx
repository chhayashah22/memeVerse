import React, { useState, useEffect } from "react";
import Title from "./Title";

const MemeUploader = () => {
  const [memeFile, setMemeFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [savedMemes, setSavedMemes] = useState([]);

  useEffect(() => {
    const memes = JSON.parse(localStorage.getItem("memes")) || [];
    setSavedMemes(memes);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMemeFile({ file, previewUrl: url });
    }
  };

  const fetchAICaption = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();

      if (data.success && data.data.memes.length > 0) {
        const randomMeme =
          data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
        setCaption(randomMeme.name);
      } else {
        console.error("Error: No memes found in API response.");
      }
    } catch (error) {
      console.error("Error fetching AI caption:", error);
    }
  };

  const uploadToCloudinary = async () => {
    if (!memeFile) {
      alert("Please select a meme first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", memeFile.file);
    formData.append("upload_preset", "image_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvwort4i3/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.secure_url) {
        throw new Error("Upload failed, no URL returned.");
      }

      const newMeme = { memeUrl: data.secure_url, caption };
      const updatedMemes = [...savedMemes, newMeme];

      localStorage.setItem("memes", JSON.stringify(updatedMemes));
      setSavedMemes(updatedMemes);

      alert("Meme Uploaded!");
      setMemeFile(null);
      setCaption("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Try again.");
    }
  };

  return (
    <div className="bg-zinc-900 text-white px-4 py-8">
      <Title text1={"Upload"} text2={"Meme"} />

      {/* Meme Upload Section */}
      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <input
          type="file"
          accept="image/*,video/gif"
          onChange={handleFileUpload}
          className="block w-full p-2 border rounded mb-3 bg-gray-800"
        />

        {memeFile && (
          <div className="mb-4">
            <img
              src={memeFile.previewUrl}
              alt="Meme Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 border rounded bg-black text-white"
          placeholder="Enter a funny caption..."
        />

        <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
          <button
            onClick={fetchAICaption}
            className="bg-yellow-100 text-black px-4 py-2 rounded w-full sm:w-auto"
          >
            Generate AI Caption
          </button>
          <button
            onClick={uploadToCloudinary}
            className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Upload Meme
          </button>
        </div>
      </div>

      {/* Display Saved Memes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-4">
        {savedMemes.map((meme, index) => (
          <div key={index} className="relative">
            <img
              src={meme.memeUrl}
              alt="Saved Meme"
              className="w-full h-auto rounded-lg"
            />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-60 p-2 rounded text-sm">
              {meme.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeUploader;
