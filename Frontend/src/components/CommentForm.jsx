import axios from "axios";
import { useContext, useRef } from "react";
import { BlogContext } from "../store/BlogContext";

const CommentForm = ({ blogId }) => {
  const { updateBlog } = useContext(BlogContext);
  const usernameRef = useRef();
  const commentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}/blogs/${blogId}/comment`, {
        username: e.target.username.value,
        comment: e.target.comment.value,
      })
      .then((response) => {
        updateBlog(response.data);
      });
    e.target.username.value = "";
    e.target.comment.value = "";
  };
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            ref={usernameRef}
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            ref={commentRef}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="comment"
            rows="3"
            placeholder="Enter your comment here"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentForm;
