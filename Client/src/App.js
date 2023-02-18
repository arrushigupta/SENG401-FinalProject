import "./App.css";
import { useState } from "react";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingContext from "./context/LoadingContext";
import UserContext from "./context/UserContext";
import OurMap from "./component/Map/Map";

function App() {
  const [loading, setLoading] = useState(false);

  const [userID, setUserID] = useState("");

  return (
    <div className="App">
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <UserContext.Provider value={{ userID, setUserID }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/map" element={<OurMap />} />
                </Routes>
              </BrowserRouter>
            </UserContext.Provider>
          </LoadingContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
