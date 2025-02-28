import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MemeDetails() {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();

        const selectedMeme = data.data.memes.find((m) => m.id === id);
        setMeme(selectedMeme);

        // Retrieve likes from localStorage
        const storedLikes = JSON.parse(localStorage.getItem("memeData")) || {};
        if (selectedMeme) {
          setLikes(storedLikes[selectedMeme.id]?.likes || 0);
        }
      } catch (error) {
        console.error("Error fetching meme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);

    // Update localStorage
    const storedData = JSON.parse(localStorage.getItem("memeData")) || {};
    storedData[id] = { likes: updatedLikes };
    localStorage.setItem("memeData", JSON.stringify(storedData));
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!meme) return <p className="text-red-500 text-center">Meme not found!</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white px-4 py-6">
      {/* Meme Image & Info */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 w-full max-w-4xl">
        <img
          src={meme.url}
          alt={meme.name}
          className="w-full md:w-80 rounded-lg shadow-lg"
        />

        {/* Comments & Like Section */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="mt-2 h-32 w-full overflow-auto bg-gray-800 p-2 rounded">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <p key={index} className="bg-gray-700 p-2 rounded mb-2">{comment}</p>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 mt-2 rounded text-black"
          />
          <div className="flex space-x-2 mt-3">
            <button onClick={handleAddComment} className="p-2 bg-blue-500 text-white rounded">Add Comment</button>
            <button onClick={handleLike} className="p-2 bg-red-500 text-white rounded">❤️ {likes}</button>
          </div>
        </div>
      </div>

      {/* Meme Name */}
      <h2 className="text-2xl font-bold mt-4 text-center">{meme.name}</h2>
    </div>
  );
}

export default MemeDetails;
