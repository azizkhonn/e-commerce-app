import { useState } from 'react';
import { Button, Checkbox, Form, Input, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from "../../../api";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/auth/login', values);
      console.log('Login Success:', response.data);
      // Handle successful login (e.g., redirect, save token, etc.)
    } catch (error) {
      console.log('Login Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await axios.post('/auth/google', {
        token: credentialResponse.credential,
      });
      console.log('Google Login Success:', response.data);
      // Handle successful Google login (e.g., redirect, save token, etc.)
    } catch (error) {
      console.log('Google Login Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google Login Failed');
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className="text-center" level={2}>Login</Title>
      <Form.Item
        label="Username"
        name="username"
        style={{ marginBottom: '5px' }}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        style={{ marginBottom: '5px' }}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        style={{ marginBottom: '5px' }}
        className="w-full"
        wrapperCol={{ span: 24 }}
      >
        <Button className="w-full p-[18px]" type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
      <Divider className="my-[20px] text-gray-500">
        <span className="text-gray-500">Or login with</span>
      </Divider>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
          theme="filled_blue"
          text="continue_with"
          size="large"
          shape="rectangular"
          width={300}
        />
      </div>
      <Text className="mt-[20px] block text-center">
        Don't have an account? <Link to="/auth/register">Register</Link>
      </Text>
    </Form>
  );
};

export default Login;
