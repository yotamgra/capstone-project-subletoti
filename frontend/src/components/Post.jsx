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
          "es-CO",
          { year:"2-digit", month:"2-digit", day:"2-digit", hour: "2-digit", minute: "2-digit" },
          {
            timeZone: `Israel`,
          }
        )}
      </div>
      <div>
        <h6>Dates</h6>
        <p>From {new Date(post.availableFrom).toLocaleString(
          "es-CO",
          { year:"2-digit", month:"2-digit", day:"2-digit" },
          {
            timeZone: `Israel`,
          }
        )}</p>
        <p>Until {new Date(post.availableUntil).toLocaleString(
          "es-CO",
          {year:"2-digit", month:"2-digit", day:"2-digit" },
          {
            timeZone: `Israel`,
          }
        )}</p>
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
