import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features/posts/postSlice";
import PostsDisplay from "../../components/PostsDisplay";
import NewPostForm from "../../components/NewPostForm";
import { toast } from "react-toastify";
import { Spin } from "antd";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const shouldDispatch = useRef(true);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (shouldDispatch.current) {
      shouldDispatch.current = false;
      dispatch(getAllPosts());
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return (
      <div className="posts-display-comp">
        <Spin className="spinner" tip="Loading" size="large" />
      </div>
    );
  }
  return (
    <div>
      <h1>Welcome {user && user.name}</h1>

      <NewPostForm />

      {user && <PostsDisplay posts={posts} />}
    </div>
  );
}

export default Dashboard;
