import CommentForm from "./CommentForm";
import { BlogContext } from "../store/BlogContext";
import { useContext } from "react";
import axios from "axios";

const Blogs = ({ blog }) => {
  const { updateBlog, deleteBlog } = useContext(BlogContext);

  const handleLike = async () => {
    try {
      await axios
        .put(`${import.meta.env.VITE_API_URL}/blogs/${blog._id}/like`)
        .then((response) => {
          updateBlog(response.data);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${blog._id}`).then(() => {
      deleteBlog(blog._id);
    });
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(blog);
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <p className="text-base text-gray-700 leading-relaxed mb-4">
          {blog.content}
        </p>
        <p className="text-sm text-gray-500 mb-2">By {blog.author}</p>
        <p className="text-sm text-gray-500 mb-4">
          {formatDateTime(blog.createdAt)}
        </p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-600">
            Likes: {blog.likes}
          </p>
          <div>
            <button
              onClick={handleLike}
              className="mr-2 inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Like
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Comments:
          </h3>
          {blog.comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="p-4 bg-gray-100 rounded-lg mb-2"
            >
              <p className="text-sm text-gray-500">By {comment.username}</p>
              <p className="text-sm text-gray-700">{comment.comment}</p>
              <p className="text-xs text-gray-400">
                {formatDateTime(comment.createdAt)}
              </p>
            </div>
          ))}
        </div>
        <CommentForm blogId={blog._id} />
      </div>
    </div>
  );
};
export default Blogs;
