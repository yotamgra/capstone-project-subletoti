import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostsDisplay from "../components/PostsDisplay";

function Dashboard() {


  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
   

  }, [user, navigate]);

  return <div>
    <h1>Welcome {user && user.name}</h1>
    <PostsDisplay />
   
  </div>;
}

export default Dashboard;
