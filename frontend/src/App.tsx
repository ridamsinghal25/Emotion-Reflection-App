import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuth } from "@clerk/clerk-react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import EmotionsPage from "./pages/EmotionsPage";
import { ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";

function App() {
  const { isSignedIn } = useAuth();

  if (isSignedIn === null || isSignedIn === undefined) {
    return (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-24 w-24 animate-spin text-indigo-600" />
          </div>
        </div>
      </div>
    );
  }

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
