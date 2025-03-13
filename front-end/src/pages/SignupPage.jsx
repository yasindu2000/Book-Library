
import {Link} from 'react-router'

function SignupPage() {
  return (
    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12">
      <h2 className="text-center font-semibold pt-8 md:text-2xl w-full mx-auto underline">
        Sign Up
      </h2>

      <form className="flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10">
        <div className="flex flex-col w-full">
          <label className="md:text-lg">Username: </label>
          <input
            type="text"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Email: </label>
          <input
            type="email"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Password: </label>
          <input
            type="password"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Confirm Password: </label>
          <input
            type="password"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounde-lg bg-white border-gray-500"
          />
        </div>
        <button className="w-full bg-[#403D39] text-[#FFFCF2] px-3 py-2 rounded-lg font-semibold">
          Sign Up
        </button>

        <p className="">Already have an account? <Link to={"/login"} className='text-[#944424] underline'>Login</Link></p>
      </form>
    </div>
  );
}

export default SignupPage;
