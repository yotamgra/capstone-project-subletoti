import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";

const theme = createTheme({
  palette: {
   
    secondary: {
      // This is green.A700 as hex.
      main: "#000000",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
