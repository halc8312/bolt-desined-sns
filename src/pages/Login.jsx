import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuthStore from '../store/authStore';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.background.tertiary};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem;
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.status.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.colors.text.secondary};

  a {
    color: ${props => props.theme.colors.accent};
    font-weight: bold;
  }
`;

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <LoginContainer>
      <Title>ログイン</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', {
            required: 'メールアドレスは必須です',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '有効なメールアドレスを入力してください'
            }
          })}
          placeholder="メールアドレス"
          type="email"
          defaultValue="test@example.com" // 開発用
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          {...register('password', {
            required: 'パスワードは必須です',
            minLength: {
              value: 8,
              message: 'パスワードは8文字以上である必要があります'
            }
          })}
          placeholder="パスワード"
          type="password"
          defaultValue="password123" // 開発用
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'ログイン中...' : 'ログイン'}
        </Button>
      </Form>

      <RegisterLink>
        アカウントをお持ちでない方は<Link to="/register">新規登録</Link>
      </RegisterLink>
    </LoginContainer>
  );
}

export default Login;
