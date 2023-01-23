import { useDispatch, useSelector } from "react-redux";
import { deletePost, setEditForm } from "../features/posts/postSlice.js";

function Post({ post }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h3>{post.header}</h3>
      <div>
        <img src={post.img} alt={post.header}></img>
      </div>
      <div>
        posted at{" "}
        {new Date(post.createdAt).toLocaleString(
          "en-US",
          { hour: "2-digit", minute: "2-digit" },
          {
            timeZone: `Israel`,
          }
        )}
      </div>
      {user._id === post.user ? (
        <>
          <button
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              dispatch(setEditForm(post));
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;