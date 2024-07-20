/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import axios from "../../../api";

const { Title, Text } = Typography

const Register = () => {
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/auth', values);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className='text-center' level={2}>Register</Title>
      <Form.Item
        style={{ marginBottom: '5px' }}
        label="Firstname"
        name="first_name"
        rules={[
          {
            required: true,
            message: 'Please input your firstname!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: '5px' }}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: '5px' }}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        className='w-full'
        wrapperCol={{
          span: 24,
        }}
      >
        <Button className='w-full' type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
      <Divider className='my-[20px] text-gray-500'>
        <span className=' text-gray-500'>Or login with</span>
      </Divider>
      <div className='flex justify-center'>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
          theme='filled_blue'
          text='continue_with'
          size='large'
          shape='rectangular'
          width={300}
        />
      </div>
      <Text className=' mt-[20px] block text-center '>
        Already have an account?<Link to="/auth">Login</Link>
      </Text>
    </Form>
  );
}

export default Register;
