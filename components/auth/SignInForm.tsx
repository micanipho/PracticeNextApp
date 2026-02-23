'use client';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { useStyles } from './style/style';
import Link from 'next/link';
import { useAuthActions } from '@/app/providers/authProvider';

const SignInForm: React.FC = () => {
  const actions = useAuthActions();
  const onFinish = (values: any) => {
    actions?.signIn(values);
  };
  const { Title, Text } = Typography;


  const { styles } = useStyles();

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      className={styles.form}
      onFinish={onFinish}
    >
      <div className={styles.title}>
        <Title>Sign In</Title>
        <Text type="secondary">Welcome back</Text>
      </div>
      <Form.Item
        name="email"
        className={styles.formItem}
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input className={styles.formInput} prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        className={styles.formItem}
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input className={styles.formInput} prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item className={styles.formItem}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link href="/sign-in">Forgot password</Link>
      </Form.Item>

      <Form.Item className={styles.formItem}>
        <Button className={styles.button} htmlType="submit">
          Log in
        </Button>
        Don't have an account? <Link href="/sign-up">Register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;