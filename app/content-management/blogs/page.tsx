"use client";

import React, { useState } from "react";
import axios from "axios";

const BlogsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    axios.post("http://localhost:8080/blogs/create", {
        title: formData.title,
        content: formData.content,
        author: "AT DIGITAL Marketing Services",
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-2 bg-neutral-100">
      <h1 className="text-2xl font-medium">Create a blog</h1>
      <form
        className="flex flex-col w-full p-4 gap-2 border-2 rounded-md border-neutral-400 bg-neutral-50 shadow-lg"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" />
        <input
          className="p-2 px-4 border-2 border-neutral-400 rounded-md"
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <label htmlFor="content" />
        <textarea
          className="border-2 border-neutral-400 rounded-md p-4"
          name="content"
          placeholder="Write something.."
          rows={4}
          onChange={handleChange}
          required
        ></textarea>
        <button
          className="bg-blue-600 hover:bg-blue-700 p-2 text-neutral-50 rounded-md cursor-pointer"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default BlogsPage;
