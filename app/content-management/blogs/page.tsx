"use client";

import React, { useState } from "react";
import axios from "axios";
import RichTextEditor from "@/app/components/RichTextEditor";

const BlogsPage = () => {

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const [formData, setFormData] = useState({
    title: "",
    author: "AT DIGITAL Marketing Services",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContentChange = (html: string) => {
    setFormData((prev) => ({
      ...prev,
      content: html,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:8080/blogs/create", formData);

      // Reset form after post
      setFormData({
        title: "",
        author: "AT DIGITAL Marketing Services",
        content: "",
      });

      setSuccessMessage("Blog has been posted!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col items-start justify-start min-h-full p-8 gap-2 bg-neutral-100">
      <h1 className="text-4xl font-semibold">Create a blog</h1>

      {successMessage && (
        <div className="bg-green-300 border border-green-600 text-green-950 px-4 py-2 rounded-md animate-fadeIn">
          {successMessage}
        </div>
      )}

      <form
        className="flex flex-col w-full p-4 gap-4 border border-neutral-400 bg-neutral-50 shadow-lg rounded-md"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 px-4 focus:outline-none text-2xl font-semibold" 
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="min-h-fit">
          <RichTextEditor
            value={formData.content}
            onChange={handleContentChange}
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 p-2 text-neutral-50 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Post"}
        </button>
      </form>
    </div>
  );
};

export default BlogsPage;
