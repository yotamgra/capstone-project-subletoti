import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../features/posts/postSlice";
import { useEffect } from "react";
import PostPreview from "../PostPreview";
import { toast } from "react-toastify";
import { Space, Spin } from "antd";

function PostsDisplay() {
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log("error", message);
    }
    dispatch(getAllPosts());
  }, [dispatch, isError, message]);

  if (isLoading) {
    return (
      <div className="posts-display-comp">
        <Spin className="spinner" tip="Loading" size="large" />
      </div>
    );
  }
  return (
    <>
      <div className="posts-display-comp">
        {posts.map((post) => (
          <PostPreview post={post} key={post._id} />
        ))}
      </div>
    </>
  );
}

export default PostsDisplay;
