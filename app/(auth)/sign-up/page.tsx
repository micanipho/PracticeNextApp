'use client';
import { Suspense } from 'react';
import SignUpForm from '@/components/auth/SignUpForm';
import { Spin } from 'antd';

export default function SignUpPage() {
  return (
    <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><Spin size="large" /></div>}>
      <SignUpForm />
    </Suspense>
  );
}
