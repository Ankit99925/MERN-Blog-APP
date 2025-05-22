import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";
const CreateBlog = () => {
  const { addBlog } = useContext(BlogContext);
  const titleRef = useRef();
  const contentRef = useRef();
  const authorRef = useRef();
  const navigate = useNavigate();

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const author = authorRef.current.value;

    axios
      .post(`${import.meta.env.VITE_API_URL}/blogs`, {
        title,
        content,
        author,
      })
      .then(function (response) {
        console.log(response);
        addBlog(response.data);
        titleRef.current.value = "";
        contentRef.current.value = "";
        authorRef.current.value = "";
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4  text-center">
        Create Your Blog Post
      </h1>
      <form
        className="flex flex-col space-y-4 w-1/2 mx-auto border-amber-200"
        onSubmit={handleCreateBlog}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            ref={contentRef}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            ref={authorRef}
            type="text"
            id="author"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="self-end px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Blog
        </button>
      </form>
    </>
  );
};
export default CreateBlog;
