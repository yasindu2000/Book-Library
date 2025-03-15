import React from 'react'
import { Link } from 'react-router'

function BookList() {


const books = ["", "", "", "", "", ""];



  return (
    <div className='text-[#252422] bg-[#F5F5F5] PX-4 md:px-12 pb-20 '>
        <h1 className="py-6 text-2xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl">Reader&rsquo;s favourites</h1>
    
      <div className="flex flex-wrap justify-center gap-5 lg:gap-8 max-w-7xl mx-auto">
        {books.map((book, index)=>(

           <Link key={index} to={"/book/123"} className='block'>

            <div className="cursor-pointer w-36 md:w-40 xl:w-44 shadow-sm hover:shadow-md rounded-b-md">
              <div className="h-48 md:h-52 xl:h-60 bg-gray-900">

                <img src="" alt="" className="" />
              </div>

              <div className="p-2">
                <h2 className="mb-2 font-semibold text-base md:text-lg">The Nice Book</h2>
                <p className="text-sm md:text-base">John Doe</p>
              </div>
            </div>
           </Link>

        ))}
      </div>
    </div>
  )
}

export default BookList