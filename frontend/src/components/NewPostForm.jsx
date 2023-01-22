import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postSlice";

function NewPostForm({ isChange, setIsChange }) {
  const intialValue = {
    _id: null,
    header: "",
    price: "",
    description: "",
    location: "",
    img: "",
  };
  const [post, setPost] = useState(intialValue);

  const [isPostFormExpended, setIsPostFormExpended] = useState(false);

  const dispatch = useDispatch();

  const { editForm } = useSelector((state) => state.posts.editForm);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ post }));
    setPost(intialValue);
  };

  const updatePost = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isChange && editForm) {
      setPost(editForm);
      setIsPostFormExpended(true);
    }
  }, [setPost, editForm, isChange]);

  return (
    <>
      {isPostFormExpended ? (
        <>
          <button
            onClick={() => {
              // dispatch(resetEdit());
              setPost(intialValue);
              setIsPostFormExpended(false);
            }}
          >
            close form
          </button>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Header</label>
              <input
                type="text"
                name="header"
                id="header"
                value={post.header}
                onChange={(e) => setPost({ ...post, header: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                value={post.price}
                onChange={(e) => setPost({ ...post, price: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={post.location}
                onChange={(e) => setPost({ ...post, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={post.description}
                onChange={(e) =>
                  setPost({ ...post, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Image URL</label>
              <input
                type="text"
                name="img"
                id="img"
                value={post.img}
                onChange={(e) => setPost({ ...post, img: e.target.value })}
              />
            </div>
            <div className="form-group">
              {editForm ? (
                <button onClick={updatePost}>Save</button>
              ) : (
                <button type="submit">Add post</button>
              )}
            </div>
          </form>
        </>
      ) : (
        <button onClick={() => setIsPostFormExpended(true)}>
          Add new post
        </button>
      )}
    </>
  );
}

export default NewPostForm;
