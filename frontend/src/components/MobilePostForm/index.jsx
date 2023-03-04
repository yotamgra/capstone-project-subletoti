import "./style.scss";

import OwnerDatePicker from "../OwnerDatePicker";
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch,
} from "antd-mobile";
import dayjs from "dayjs";
import { DatePickerRef } from "antd-mobile/es/components/date-picker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  createPost,
  updatePost,
  resetEditForm,
} from "../../features/posts/postSlice";
import { toast } from "react-toastify";

function MobilePostForm() {
  const onFinish = (values) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    });
  };

  const intialValue = {
    _id: null,
    header: "",
    price: null,
    cleaningFee: null,
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

  const dispatch = useDispatch();

  const onSubmit = async () => {
    console.log(post);
    dispatch(createPost({ post }));

    setPost(intialValue);
    // onClose()
  };

  const onUpdatePost = () => {
    dispatch(updatePost(post));
    dispatch(resetEditForm());
    setPost(intialValue);
    // onClose()
  };

  useEffect(() => {
    if (editForm) {
      setPost(editForm);
      setIsEdit(true);
      // showDrawer()
    }
    if (isError) {
      toast.error(message);
    }
  }, [setPost, editForm, isError, message, setIsEdit, dispatch]);

  return (
    <div className="mobile-post-form-comp">
      <Form
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            Add new post
          </Button>
        }
      >
        <Form.Item
          name="Header"
          label="Header"
          rules={[{ required: true, message: "header is required" }]}
        >
          <Input
            placeholder="post`s header"
            value={post.header}
            onChange={(e) => setPost({ ...post, header: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="Price per night"
          label="Price per night"
          rules={[{ required: true, message: "Price per night is required" }]}
        >
          <Input
            placeholder="in $"
            type="number"
            value={post.price}
            onChange={(e) => setPost({ ...post, price: e })}
          />
        </Form.Item>
        <Form.Item
          name="Cleaning fee"
          label="Cleaning fee"
          rules={[{ required: true, message: "Price per night is required" }]}
        >
          <Input
            placeholder="in $"
            type="number"
            value={post.cleaningFee}
            onChange={(e) => setPost({ ...post, cleaningFee: e })}
          />
        </Form.Item>
        <Form.Item
          name="Location"
          label="Location"
          rules={[{ required: true, message: "location is required" }]}
        >
          <Input
            placeholder="post`s location"
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
          />
        </Form.Item>
        <Form.Item name="Description" label="Description">
          <TextArea
            placeholder="post`s description"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
        <Form.Item
          className="url-form-item"
          name="Images URL"
          label="Images URL"
        >
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
          name="Disabeled Dates"
          label="Disabeled Dates"
        >

        </Form.Item>
        <OwnerDatePicker
          key={post._id}
          post={post}
          setPost={setPost}
          editForm={editForm}
          direction="vertical"
        />
       
      </Form>
      {/* horizontal */}
      {/* 
       
        
      
        <
       

        
        <p>Disabeled Dates:</p>
        <OwnerDatePicker
          key={post._id}
          post={post}
          setPost={setPost}
          editForm={editForm}
        />
      </Form> */}
    </div>
  );
}

export default MobilePostForm;
