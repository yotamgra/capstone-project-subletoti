import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import LoginAntd from "./pages/LoginAntd";
import RegisterAntd from "./pages/RegisterAntd";
import ConfirmPage from "./pages/ConfirmPage";
import Auth from "./components/Auth/Auth";
import ForgotPassword from "./pages/Forgot";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Auth>
                  <Dashboard />
                </Auth>
              }
            />
            <Route path="/login" element={<LoginAntd />} />
            <Route path="/register" element={<RegisterAntd />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <Auth>
                  <Profile />
                </Auth>
              }
            />
            <Route
              path="/post/:postId"
              element={
                <Auth>
                  <PostPage />
                </Auth>
              }
            />
            <Route
              path="/confirm/:reservationId"
              element={
                <Auth>
                  <ConfirmPage />
                </Auth>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
