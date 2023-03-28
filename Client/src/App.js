import "./App.css";
import { useState } from "react";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingContext from "./context/LoadingContext";
import UserContext from "./context/UserContext";
import ProtectedRoute from "./component/ProtectedRoute";
import SettingsPage from "./pages/Settings";
import UserPage from "./pages/UserPage";
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import VerifyEmail from "./pages/VerifyEmail";
import SetAvatar from "./component/ChatRoom/SetAvatar";
// require("dotenv").config();

function App() {
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");

  return (
    <div className="App ">
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <UserContext.Provider value={{ userID, setUserID }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />                   */}

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verifyEmail:user"
                element={
                  <ProtectedRoute>
                    <VerifyEmail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verifyEmail"
                element={
                  <ProtectedRoute>
                    <VerifyEmail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/setAvatar"
                element={
                  <ProtectedRoute>
                    <SetAvatar />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
