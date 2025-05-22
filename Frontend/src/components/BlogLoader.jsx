import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";

const BlogLoader = ({ children }) => {
  const { setBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border w-12 h-12" role="status"></div>
          <h1 className="text-xl">Loading...</h1>
        </div>
      )}
      {error && (
        <div className="text-center mt-5">
          <h1 className="text-xl text-red-500">
            Error loading blogs. Please try again later.
          </h1>
        </div>
      )}
      {!loading && !error && children}
    </>
  );
};
export default BlogLoader;
