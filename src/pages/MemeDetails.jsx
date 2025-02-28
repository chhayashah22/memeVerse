import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MemeDetails() {
  const { id } = useParams(); // Get ID from URL
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
        
        // Find meme with matching ID
        const selectedMeme = data.data.memes.find((m) => m.id === id);
        setMeme(selectedMeme);
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
    setLikes(likes + 1);
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!meme) return <p className="text-red-500 text-center">Meme not found!</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
      <div className="flex items-center space-x-6">
        <img src={meme.url} alt={meme.name} className="w-80 rounded-lg shadow-lg" />
        <div className="flex flex-col items-center">
          
          <div className="mt-4 w-60">
            <h3 className="text-lg font-semibold">Comments</h3>
            <div className="mt-2 h-32 overflow-auto bg-gray-800 p-2 rounded">
              {comments.map((comment, index) => (
                <p key={index} className="bg-gray-700 p-2 rounded mb-2">{comment}</p>
              ))}
            </div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 mt-2 rounded text-black"
            />
            <button onClick={handleAddComment} className="mt-2 p-2 bg-blue-500 text-white rounded">Add Comment</button>
            <button onClick={handleLike} className="text-red-500 text-2xl mb-4">❤️ {likes}</button>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-4">{meme.name}</h2>
    </div>
  );
}

export default MemeDetails;