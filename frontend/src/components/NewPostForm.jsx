import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  updatePost,
  resetEditForm,
  
} from "../features/posts/postSlice";
import DatePicker from "./DatePicker";

function NewPostForm() {
  const intialValue = {
    _id: null,
    header: "",
    price: "",
    description: "",
    location: "",
    img: "",
    availableFrom:"",
    availableUntil:""
  };
  const [post, setPost] = useState(intialValue);

  const [isPostFormExpended, setIsPostFormExpended] = useState(false);

  const dispatch = useDispatch();

  const { editForm } = useSelector((state) => state.posts);

  const onSubmit = () => {
    
    dispatch(createPost({ post }));
    setPost(intialValue);
    setIsPostFormExpended(false)
    console.log("availableFrom",post.availableFrom)
    console.log("availableUntil",post.availableUntil)
  };

  const onUpdatePost = () => {
    
    dispatch(updatePost(post));
    dispatch(resetEditForm())
    setPost(intialValue)
    setIsPostFormExpended(false)
    
    
  };

  useEffect(() => {
    if (editForm) {
      setPost(editForm);
      setIsPostFormExpended(true);
    }
  }, [setPost, editForm]);

  return (
    <>
      {isPostFormExpended ? (
        <>
          <button
            onClick={() => {
              dispatch(resetEditForm());
              setPost(intialValue);
              setIsPostFormExpended(false);
            }}
          >
            close form
          </button>
          <form onSubmit={(e)=>e.preventDefault()}>
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
            <DatePicker post={post} setPost={setPost} />
            <div className="form-group">
              {editForm ? (
                <button onClick={onUpdatePost}>Save</button>
              ) : (
                <button type="submit" onClick={onSubmit}>Add post</button>
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
