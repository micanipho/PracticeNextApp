'use client';

import React from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useStyles } from './style/style';
import Link from 'next/link';
import { useAuthActions } from '@/providers/authProvider';

const { Title, Text } = Typography;

const SignUpForm = () => {
  const actions = useAuthActions();
  const onFinish = (values: any) => {
    actions?.signUp(values);
  };

  const { styles } = useStyles();

  return (
    <Form
      name="signup"
      onFinish={onFinish}
      className={styles.form}
      layout="vertical"
    >
      <div className={styles.title}>
        <Title>Create Account</Title>
        <Text type="secondary">Join us today and start your journey</Text>
      </div>

      <Form.Item
        name="name"
        className={styles.formItem}
        rules={[{ required: true, message: 'Please input your Full Name!' }]}
      >
        <Input 
          className={styles.formInput} 
          prefix={<UserOutlined />} 
          placeholder="Full Name" 
        />
      </Form.Item>

      <Form.Item
        name="email"
        className={styles.formItem}
        rules={[
          { required: true, message: 'Please input your Email Address!' },
          { type: 'email', message: 'The input is not valid E-mail!' }
        ]}
      >
        <Input 
          className={styles.formInput} 
          prefix={<MailOutlined />} 
          placeholder="Email Address" 
        />
      </Form.Item>

      <Form.Item
        name="password"
        className={styles.formItem}
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password 
          className={styles.formInput} 
          prefix={<LockOutlined />} 
          placeholder="Password" 
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        className={styles.formItem}
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password 
          className={styles.formInput} 
          prefix={<LockOutlined />} 
          placeholder="Confirm Password" 
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox>
          I agree to the <Link href="/sign-up">Terms of Service</Link>
        </Checkbox>
      </Form.Item>

      <Form.Item style={{ width: '100%' }}>
        <Button className={styles.button} htmlType="submit">
          Create Account
        </Button>
      </Form.Item>

      <Text>
        Already have an account? <Link href="/sign-in">Sign in instead</Link>
      </Text>
    </Form>
  );
};

export default SignUpForm;
