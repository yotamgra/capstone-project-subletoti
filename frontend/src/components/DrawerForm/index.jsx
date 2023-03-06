import { Button, Drawer, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewForm from "../Form";

import {
  createPost,
  updatePost,
  resetEditForm,
} from "../../features/posts/postSlice";
import { toast } from "react-toastify";

function DrawerForm({ drawerWidth, calanderDirection }) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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
    onClose();
  };

  const onUpdatePost = () => {
    dispatch(updatePost(post));
    dispatch(resetEditForm());
    setPost(intialValue);
    onClose();
  };

  useEffect(() => {
    if (editForm) {
      setPost(editForm);
      setIsEdit(true);
      showDrawer();
    }
    if (isError) {
      toast.error(message);
    }
  }, [setPost, editForm, isError, message, setIsEdit, dispatch]);

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Add new post
      </Button>
      <Drawer
        title="Add new post"
        placement="left"
        width={drawerWidth}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              onClick={() => {
                setPost(intialValue);
                setIsEdit(false);
              }}
            >
              Clear Form
            </Button>
            {isEdit ? (
              <Button type="primary" onClick={onUpdatePost}>
                Save
              </Button>
            ) : (
              <Button type="primary" onClick={onSubmit}>
                Post
              </Button>
            )}
          </Space>
        }
      >
        <NewForm
          post={post}
          setPost={setPost}
          img={img}
          setImg={setImg}
          editForm={editForm}
          calanderDirection={calanderDirection}
        />
      </Drawer>
    </>
  );
}

export default DrawerForm;
