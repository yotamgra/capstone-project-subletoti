import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostsDisplay from "../components/PostsDisplay";
import NewPostForm from "../components/NewPostForm";
import {
  expendPostForm,
  
} from "../features/general/generalSlice.js";

function Dashboard() {
  const { isPostFormExpended } = useSelector((state) => state.general);

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
      {isPostFormExpended ? (
        <NewPostForm />
      ) : (
        <button onClick={() => {
          console.log("click")
          dispatch(expendPostForm())
        }}>Add new Post</button>
      )}

      {user && <PostsDisplay />}
    </div>
  );
}

export default Dashboard;
