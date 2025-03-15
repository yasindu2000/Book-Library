import React, { useState } from "react";

function AddBook() {


const [image, setImage] = useState("");
const [title, setTitle] = useState("");
const [subtitle, setSubtitle] = useState("");
const [author, setAuthor] = useState("");
const [link, setLink] = useState("");
const [review, setReview] = useState("");

const handleSubmit = (e) =>{

  e.preventDefault();

  console.log(title, subtitle, author, link, review);
}


  return (
    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-16">
      <h2 className="text-center font-semibold pt-8 md:text-2xl w-full mx-auto underline">
        Add Book to Library
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10"
      >

        <div className="flex flex-col w-full">


        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Book Image*: </label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Subtitle(optional): </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e)=> setSubtitle(e.target.value)}
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Author*: </label>
          <input
            type="text"
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Link*: </label>
          <input
            type="text"
            value={link}
            onChange={(e)=> setLink(e.target.value)}
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        
        <div className="flex flex-col w-full">
          <label className="md:text-lg">Personal Review (optional): </label>
          <textarea
            rows={4}
            value={review}
            onChange={(e)=> setReview(e.target.value)}

            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        {/* {error && <p className="text-red-500">{error}</p>} */}
        <button
          type="submit"
          // disabled={isLoading}
          className="w-full bg-[#403D39] text-[#FFFCF2] px-3 py-2 rounded-lg font-semibold"
        >
          Add book
        </button>

      </form>
    </div>
  );
}

export default AddBook;
