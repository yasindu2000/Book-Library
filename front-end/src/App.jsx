import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import AddBook from "./pages/AddBook"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"

function App() {
  
const {fetchUser, fetchingUser} = useAuthStore();

useEffect(() => {
  
  fetchUser();

}, [fetchUser]);

if(fetchingUser){

  return <p>Loading...</p>
}

  return (
    <>
    <Toaster/>
      <Navbar/>

      <Routes>
        <Route path={"/"} element={<Homepage/>}></Route>
        <Route path={"/add-book"} element={<AddBook/>}></Route>
        <Route path={"/login"} element={<LoginPage/>}></Route>
        <Route path={"/signup"} element={<SignupPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
