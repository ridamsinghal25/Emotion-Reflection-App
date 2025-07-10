import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuth } from "@clerk/clerk-react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import EmotionsPage from "./pages/EmotionsPage";
import { ToastContainer } from "react-toastify";

function App() {
  const { isSignedIn } = useAuth();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isSignedIn ? <HomePage /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-in/*"
          element={isSignedIn ? <Navigate to="/" /> : <SignInPage />}
        />
        <Route
          path="/sign-up/*"
          element={isSignedIn ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/emotions"
          element={isSignedIn ? <EmotionsPage /> : <Navigate to="/sign-in" />}
        />
      </Routes>
      <ToastContainer autoClose={2000} closeOnClick={true} />
    </BrowserRouter>
  );
}

export default App;
