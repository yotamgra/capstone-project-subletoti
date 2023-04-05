import {
  FacebookOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  UserOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { Space, Tabs } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";

const iconStyles = {
  marginInlineStart: "16px",
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const RegisterAntd = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const tubsItems = [
    { label: "already have an account?", key: "login" },
    { label: "create new account", key: "register" },
  ];


  const { name, email, password, password2 } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginType, setLoginType] = useState("register");

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setFormData((prevState) => ({
        ...prevState,
        password: "",
        password2: "",
      }));
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: "white" }}>
        <LoginForm
          onFinish={onSubmit}
          submitter={{ searchConfig: { submitText: "Submit" } }}
          logo=""
          title="Register"
          actions={
            <Space>
              or Sign Up using:
              <FacebookOutlined style={iconStyles} />
              <GoogleOutlined style={iconStyles} />
              <TwitterOutlined style={iconStyles} />
            </Space>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => {
              setLoginType(activeKey);
              navigate(`/${activeKey}`);
            }}
            items={tubsItems}
          >
            {/* <Tabs.TabPane key={"login"} tab={"already have an account?"} />
            <Tabs.TabPane key={"register"} tab={"create new account"} /> */}
          </Tabs>
          <ProFormText
            name="name"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"name"}
            rules={[
              {
                required: true,
                message: "name is required!",
              },
            ]}
            value={name}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
          <ProFormText
            name="email"
            fieldProps={{
              size: "large",

              prefix: <MailOutlined className={"prefixIcon"} />,
            }}
            placeholder={"email"}
            rules={[
              {
                required: true,
                message: "email is required!",
              },
            ]}
            value={email}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"password"}
            rules={[
              {
                required: true,
                message: "password is required!",
              },
            ]}
            value={password}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
          />
          <ProFormText.Password
            name="password2"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"confirm your password"}
            rules={[
              {
                required: true,
                message: "password is required!",
              },
            ]}
            value={password2}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                password2: e.target.value,
              }));
            }}
          />

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              remmember me
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
export default RegisterAntd;
