'use client';
import { Suspense } from 'react';
import SignInForm from '@/components/auth/SignInForm';
import { Spin } from 'antd';

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><Spin size="large" /></div>}>
      <SignInForm />
    </Suspense>
  );
}
