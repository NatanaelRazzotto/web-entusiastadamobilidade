"use client"

import React, { useState } from 'react';
import Router from 'next/router';

export default function Page() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const body = { title, content };
      // TODO
      console.log("🚀 ~ submitData ~ body:", body)
      // You will implement this next ...
    };
    return (
      <div className="bg-geist-background p-12 flex justify-center items-center min-h-screen">
      <form onSubmit={submitData} className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">New Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
          className="w-full p-2 my-2 rounded border border-solid border-gray-300"
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
          className="w-full p-2 my-2 rounded border border-solid border-gray-300"
        />
        <input
          disabled={!content || !title}
          type="submit"
          value="Create"
          className="bg-gray-200 border-0 p-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <a
          className="ml-4 text-blue-500 hover:underline"
          href="#"
          onClick={() => Router.push('/')}
        >
          or Cancel
        </a>
      </form>
    </div>
    )
  }