import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../features/posts/postSlice";
import { useEffect } from "react";
import "./style.scss";
import GeneralPost from "../../components/GeneralPost";
import MyPost from "../../components/MyPost";

function PostPage() {
  const dispatch = useDispatch();

  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { singlePost, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      // alert(message)
      console.log("error", message);
    }
    dispatch(getPostById(postId));
  }, [dispatch, message, postId, isError]);

  if (isLoading) {
    return <h3>Loading</h3>;
  }

  return (
    <div className="post-page-comp">
      {singlePost ? (
        <>
          {singlePost.user === user._id ? (
            <MyPost singlePost={singlePost} />
          ) : (
            <GeneralPost singlePost={singlePost} />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PostPage;
