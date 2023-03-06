import "./style.scss";

import { Button, Form, Input, InputNumber } from "antd";

import OwnerDatePicker from "../OwnerDatePicker";

const { TextArea } = Input;

function NewForm({ post, setPost, img, setImg, editForm, calanderDirection }) {
  return (
    <div className="new-form-comp">
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Header">
          <Input
            type="text"
            value={post.header}
            onChange={(e) => setPost({ ...post, header: e.target.value })}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Price per night">
          <InputNumber
            value={post.price}
            onChange={(e) => setPost({ ...post, price: e })}
          />
        </Form.Item>
        <Form.Item label="Cleaning fee">
          <InputNumber
            value={post.cleaningFee}
            onChange={(e) => setPost({ ...post, cleaningFee: e })}
          />
        </Form.Item>
        <Form.Item label="Location">
          <Input
            type="text"
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            allowClear
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Images URL">
          <Input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            allowClear
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
        <p>Disabeled Dates:</p>
        <OwnerDatePicker
          key={post._id}
          post={post}
          setPost={setPost}
          editForm={editForm}
          direction={calanderDirection}
        />
      </Form>
    </div>
  );
}

export default NewForm;
