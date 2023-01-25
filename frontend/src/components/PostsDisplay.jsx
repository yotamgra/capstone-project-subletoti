import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../features/posts/postSlice";
import { useEffect } from "react";
import Post from "./Post";


function PostsDisplay() {
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      // alert(message)
      console.log("error", message);
    }
    dispatch(getAllPosts());
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <h3>Loading</h3>;
  }
  return (
    <>
      <div className="flex posts-container">
        {posts.map((post) => (
          <Post post={post} key={post._id}  />
        ))}
      </div>
    </>
  );
}

export default PostsDisplay;
