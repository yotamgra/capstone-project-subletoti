import "./style.scss";
import {
  MailOutlined,
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { Space, Spin } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, login, reset } from "../../features/auth/authSlice";

function ForgotPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const iconStyles = {
    marginInlineStart: "16px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  const onSubmit = () => {
    dispatch(forgotPassword({email}));
  };

  return (
    <div className="forgot-password-comp">
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: "white" }}>
          <LoginForm
            onFinish={onSubmit}
            submitter={{ searchConfig: { submitText: "Send an email" } }}
            logo=""
            title="Reset Your Password"
            actions={
              <Space>
                or Sign Up using:
                <FacebookOutlined style={iconStyles} />
                <GoogleOutlined style={iconStyles} />
                <TwitterOutlined style={iconStyles} />
              </Space>
            }
          >
            <>
              <ProFormText
                name="email"
                type="email"
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
                  setEmail(e.target.value);
                  console.log(email)
                }}
              />
            </>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
}

export default ForgotPassword;
