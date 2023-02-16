import './App.css';
import { useState } from "react"
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingContext from "./context/LoadingContext";
import UserContext from "./context/UserContext";
import ProtectedRoute from './component/ProtectedRoute';
import SettingsPage from './pages/Settings';
import UserPage from './pages/User';


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
                  <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                  <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
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