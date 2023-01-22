import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postSlice";

function NewPostForm({setIsFormExpended}) {
  const intialValue = {
    header: "",
    price: "",
    description: "",
    location:"",
    img: "",
  };
  const [post, setPost] = useState(intialValue);

  const dispatch = useDispatch()

  const onSubmit = (e)=>{
    e.preventDefault();
    dispatch(createPost({ post }));
    setPost(intialValue);

  }

  return (
    <>
    <button onClick={()=>setIsFormExpended(false)}>close form</button>
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
            onChange={(e) => setPost({ ...post, description: e.target.value })}
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
          <button type="submit">
            Add post
          </button>
        </div>
      </form>
    </>
  );
}

export default NewPostForm;
