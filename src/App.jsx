import { useEffect, useState } from "react";

import "./App.css";
import Blog from "./blog";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}wp-json/wp/v2/posts`)
      .then((res) => {
        setPosts(res.data);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((item, i) => (
        <Blog key={i} post={item} />
      ))}
    </div>
  );
}

export default App;
