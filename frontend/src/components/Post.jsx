import { useDispatch, useSelector } from "react-redux";

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
        {new Date(post.createdAt).toLocaleString("en-US", {hour: '2-digit', minute:'2-digit'}, {
          timeZone: `Israel`,
        })}
      </div>
      {user._id === post.user ? (
        <button value={post._id} onClick={() => {}}>
          Delete
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;
