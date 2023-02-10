import { useLocation } from "react-router-dom";
import ImgesGallery from "../../components/ImagesGallery";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../features/posts/postSlice";
import { useEffect } from "react";
import "./style.scss";
import CheckIn from "../../components/CheckIn";

function PostPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { singlePost, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

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
  console.log("single", singlePost);
  return (
    <div className="post-page-comp">
      {singlePost ? (
        <>
          <h1>{singlePost.header}</h1>
          <ImgesGallery gallery={singlePost.imagesGallery} />
          <CheckIn post={singlePost} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PostPage;
