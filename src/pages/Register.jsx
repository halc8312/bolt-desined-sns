import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuthStore from '../store/authStore';

// ... 既存のスタイルコンポーネント ...

function Register() {
  const navigate = useNavigate();
  const { register: registerUser, loading, error } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) {
      navigate('/', { replace: true });
    }
  };

  // ... 既存のコード ...

  return (
    <RegisterContainer>
      <Title>新規登録</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* ... 既存のフォーム要素 ... */}
      </Form>
    </RegisterContainer>
  );
}

export default Register;
