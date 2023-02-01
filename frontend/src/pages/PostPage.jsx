import { useLocation } from "react-router-dom";
import ImgesGallery from "../components/ImagesGallery";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../features/posts/postSlice";
import { useEffect } from "react";
import DatePickerAntd from "../components/DatePickerAntd";

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
    <>
      {singlePost ? (
        <>
          <h1>{singlePost.header}</h1>
          <ImgesGallery gallery={singlePost.imagesGallery} />
          <DatePickerAntd />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PostPage;
