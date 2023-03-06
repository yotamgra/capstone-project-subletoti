import "./style.scss";

import OwnerDatePicker from "../OwnerDatePicker";
import { Form, Input, Button, Dialog, TextArea } from "antd-mobile";

import { useDispatch, useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";

import {
  createPost,
  updatePost,
  resetEditForm,
} from "../../features/posts/postSlice";
import { toast } from "react-toastify";

function MobilePostForm() {
  const intialValue = {
    _id: null,
    header: "",
    price: "",
    cleaningFee: "",
    description: "",
    location: "",
    imagesGallery: [],
    disabledDates: [],
    disabledRanges: [],
  };
  const [post, setPost] = useState(intialValue);
  const [img, setImg] = useState("");

  const { editForm, isError, message } = useSelector((state) => state.posts);
  const [isEdit, setIsEdit] = useState(editForm ? true : false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const goToTop = () => {
    window.scrollTo({
        top: 100,
        behavior: 'smooth',
    });
};
  const dispatch = useDispatch();

  const onSubmit = async () => {
    console.log(post);
    dispatch(createPost({ post }));

    setPost(intialValue);
    setIsFormOpen(false);
  };

  const onUpdatePost = () => {
    dispatch(updatePost(post));
    dispatch(resetEditForm());
    setPost(intialValue);
    setIsFormOpen(false);
  };

  useEffect(() => {
    if (editForm) {
      setPost(editForm);
      setIsEdit(true);
      setIsFormOpen(true);
      goToTop()
    }

    if (isError) {
      toast.error(message);
    }
  }, [setPost, editForm, isError, message, setIsEdit, dispatch]);

  return (
    <div className="mobile-post-form-comp">
      {!isFormOpen && (
        <Button onClick={() => setIsFormOpen(true)}>Add new post</Button>
      )}
      {isFormOpen && (
        <>
          <Form
     
            className="form"
            layout="horizontal"
            footer={
              <Button
                onClick={() => {
                  isEdit ? onUpdatePost() : onSubmit();
                }}
                block
                type="submit"
                color="primary"
                size="large"
              >
                {isEdit ? "Save" : "Add new post"}
              </Button>
            }
          >
            <Form.Item
              label="Header"
              rules={[{ required: true, message: "header is required" }]}
            >
              <Input
                placeholder="post`s header"
                value={post.header}
                onChange={(e) => setPost({ ...post, header: e })}
              />
            </Form.Item>
            <Form.Item
              label="Price per night"
              rules={[
                { required: true, message: "Price per night is required" },
              ]}
            >
              <Input
                placeholder="in $"
                type="number"
                value={post.price}
                onChange={(e) => setPost({ ...post, price: e })}
              />
            </Form.Item>
            <Form.Item
              label="Cleaning fee"
              rules={[
                { required: true, message: "Price per night is required" },
              ]}
            >
              <Input
                placeholder="in $"
                type="number"
                value={post.cleaningFee}
                onChange={(e) => setPost({ ...post, cleaningFee: e })}
              />
            </Form.Item>
            <Form.Item
              label="Location"
              rules={[{ required: true, message: "location is required" }]}
            >
              <Input
                placeholder="post`s location"
                value={post.location}
                onChange={(e) => setPost({ ...post, location: e })}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                placeholder="post`s description"
                value={post.description}
                onChange={(e) => setPost({ ...post, description: e })}
                maxLength={100}
                rows={2}
                showCount
              />
            </Form.Item>
            <Form.Item className="url-form-item" label="Images URL">
              <Input
                placeholder="add url"
                value={img}
                onChange={(e) => setImg(e)}
              />
              <Button
                onClick={(e) => {
                  post.imagesGallery.push(img);
                  setImg("");
                  setPost({ ...post });
                }}
              >
                Add Image
              </Button>
            </Form.Item>
            <Form.Item
              className="Disabeled Dates"
              label="Disabeled Dates"
            ></Form.Item>
            <OwnerDatePicker
              key={post._id}
              post={post}
              setPost={setPost}
              editForm={editForm}
              direction="vertical"
            />
            <Button onClick={() => setIsFormOpen(false)} className="close">
              x
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default MobilePostForm;
