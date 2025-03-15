import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import AddBook from "./pages/AddBook";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers";
import RedirectUnauthenticatedUser from "./providers/RedirectUnauthenticatedUser";

function App() {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Homepage />}></Route>
        <Route path={"/add-book"} element={<RedirectUnauthenticatedUser><AddBook /></RedirectUnauthenticatedUser>}></Route>
        <Route
          path={"/login"}
          element={
            <RedirectAuthenticatedUsers>
              <LoginPage />
            </RedirectAuthenticatedUsers>
          }
        ></Route>
        <Route
          path={"/signup"}
          element={
            <RedirectAuthenticatedUsers>
              <SignupPage />
            </RedirectAuthenticatedUsers>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
