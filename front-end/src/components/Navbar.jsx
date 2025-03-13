import { Link } from "react-router"


function Navbar() {
  return (
    
  <nav className="bg-[#252422] flex justify-between text-[#FFFCF2] items-center px-4 md:px-12 py-4 md:py-6">

   <Link to='/'>
       <label className="font-semibold tracking-wider md:text-lg lg:text-xl cursor-pointer" >FavLib</label>
   </Link>
       <div className="flex items-center space-x-5 md:text-lg">

          <Link to={'/add-book'}><p className="cursor-pointer">Add Book</p></Link>
          <Link to={'/login'}><p className="cursor-pointer">Log In</p></Link>
          <Link to={'/signup'}><p className="cursor-pointer bg-[#403D39] px-3 py-2 rounded-lg">Sign Up</p></Link>

       </div>


  </nav>

  )
}

export default Navbar