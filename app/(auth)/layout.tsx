import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
}
