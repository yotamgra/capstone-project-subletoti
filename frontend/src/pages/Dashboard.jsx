import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostsDisplay from "../components/PostsDisplay";
import NewPostForm from "../components/NewPostForm";

function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Welcome {user && user.name}</h1>

      <NewPostForm />

      {user && <PostsDisplay />}
    </div>
  );
}

export default Dashboard;
