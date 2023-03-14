import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { message, Space, Spin, Tabs } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";

const iconStyles = {
  marginInlineStart: "16px",
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const LoginAntd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [loginType, setLoginType] = useState("login");

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setFormData((prevState) => ({ ...prevState, password: "" }));
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <div className="posts-display-comp">
        <Spin className="spinner" tip="Loading" size="large" />
      </div>
    );
  }

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: "white" }}>
        <LoginForm
          onFinish={onSubmit}
          submitter={{ searchConfig: { submitText: "Submit" } }}
          logo=""
          title="Login"
          actions={
            <Space>
              hahah
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
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
          >
            <Tabs.TabPane key={"login"} tab={"already have an account?"} />
            <Tabs.TabPane key={"register"} tab={"create new account"} />
          </Tabs>
          {loginType === "login" && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
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
            </>
          )}
         
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              remmember me
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
            >
              forget your password?
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
export default LoginAntd;
