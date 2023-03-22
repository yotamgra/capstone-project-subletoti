import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import LoginAntd from "./pages/LoginAntd";
import RegisterAntd from "./pages/RegisterAntd";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginAntd />} />
            <Route path="/register" element={<RegisterAntd />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
