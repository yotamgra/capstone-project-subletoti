import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setEditForm } from "../../features/posts/postSlice.js";
import { useNavigate } from "react-router-dom";

import StarRateIcon from "@mui/icons-material/StarRate";

function PostPreview({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="post-preview-comp">
      <img
        className="img"
        onClick={() => navigate(`/post/${post._id}`)}
        src={post.imagesGallery[0]}
        alt={post.header}
      ></img>
      <div className="post-info">
        <div className="flex">
          <h3 className="post-header">{post.header}</h3>
          <div className="flex">
            <StarRateIcon />
            <p>4.7 (19)</p>
          </div>
        </div>
        <div className="description">
          <p className="desc">{post.description}</p>
        </div>
        {/* <div>
          posted at{" "}
          {new Date(post.createdAt).toLocaleString(
            "es-CO",
            {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            },
            {
              timeZone: `Israel`,
            }
          )}
        </div> */}
        {/* <div>
          <h6>Dates</h6>
          <p>
            From{" "}
            {new Date(post.availableFrom).toLocaleString(
              "es-CO",
              { year: "2-digit", month: "2-digit", day: "2-digit" },
              {
                timeZone: `Israel`,
              }
            )}
          </p>
          <p>
            Until{" "}
            {new Date(post.availableUntil).toLocaleString(
              "es-CO",
              { year: "2-digit", month: "2-digit", day: "2-digit" },
              {
                timeZone: `Israel`,
              }
            )}
          </p>
        </div> */}
      </div>
      <div className="flex price-container">
        <p className="flex gap">
          <span className="bold">{post.price}$</span> night
        </p>
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
              className="btn round"
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
    </div>
  );
}

export default PostPreview;
