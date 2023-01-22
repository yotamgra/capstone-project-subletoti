import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostsDisplay from "../components/PostsDisplay";
import NewPostForm from "../components/NewPostForm";

function Dashboard() {


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [isChange, setIsChange] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Welcome {user && user.name}</h1>

      <NewPostForm isChange={isChange} setIsChange={setIsChange} />

      {user && <PostsDisplay setIsChange={setIsChange} />}
    </div>
  );
}

export default Dashboard;
