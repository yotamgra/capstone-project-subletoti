import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createPost,
  updatePost,
  resetEditForm,
} from "../../features/posts/postSlice";
import{addPostToUser} from '../../features/auth/authSlice'
import OwnerDatePicker from "../OwnerDatePicker";

function NewPostForm() {
  const intialValue = {
    _id: null,
    header: "",
    price: 0,
    cleaningFee: 0,
    description: "",
    location: "",
    imagesGallery: [],
    disabledDates: [],
    disabledRanges: [],
  };
  const [post, setPost] = useState(intialValue);
  const [img, setImg] = useState("");

  const [isPostFormExpended, setIsPostFormExpended] = useState(false);

  const dispatch = useDispatch();

  const { editForm, isError, message } = useSelector((state) => state.posts);
  const [isEdit, setIsEdit] = useState(editForm ? true : false);

  const onSubmit = async () => {
    const response = await dispatch(createPost({ post }));
    const postId = response.payload._id;
    dispatch(addPostToUser(postId))
    setPost(intialValue);
    setIsPostFormExpended(false);
  };

  const onUpdatePost = () => {
    dispatch(updatePost(post));
    dispatch(resetEditForm());
    setPost(intialValue);
    setIsPostFormExpended(false);
  };

  useEffect(() => {
    if (editForm) {
      setPost(editForm);
      setIsEdit(true);
      setIsPostFormExpended(true);
    }
    if (isError) {
      toast.error(message);
    }
  }, [setPost, editForm, isError, message, setIsEdit, dispatch]);

  return (
    <div className="new-post-form-comp">
      {isPostFormExpended ? (
        <>
          <button
            onClick={() => {
              dispatch(resetEditForm());
              setPost(intialValue);
              setIsPostFormExpended(false);
              setIsEdit(false);
            }}
          >
            close form
          </button>
          <form onSubmit={(e) => e.preventDefault()}>
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
                type="number"
                name="price"
                id="price"
                value={post.price}
                onChange={(e) => setPost({ ...post, price: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Cleaning fee</label>
              <input
                type="number"
                name="cleaningFee"
                id="cleaningFee"
                value={post.cleaningFee}
                onChange={(e) =>
                  setPost({ ...post, cleaningFee: e.target.value })
                }
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
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <button
                onClick={(e) => {
                  post.imagesGallery.push(img);
                  setImg("");
                  setPost({ ...post });
                }}
              >
                add image
              </button>
            </div>
            <label htmlFor="text">Disabeled Dates:</label>
            <OwnerDatePicker
              key={post._id}
              post={post}
              setPost={setPost}
              editForm={editForm}
            />
            <div className="form-group">
              {isEdit ? (
                <button onClick={onUpdatePost}>Save</button>
              ) : (
                <button type="submit" onClick={onSubmit}>
                  Add post
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        <button onClick={() => setIsPostFormExpended(true)}>
          Add new post
        </button>
      )}
    </div>
  );
}

export default NewPostForm;
