import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);

  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--color-accent);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: var(--color-accent);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // ここで実際のフォーム送信処理を実装
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>お名前</Label>
        <Input 
          {...register("name", { required: "お名前は必須です" })}
          placeholder="山田 太郎"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>メールアドレス</Label>
        <Input 
          {...register("email", { 
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "有効なメールアドレスを入力してください"
            }
          })}
          placeholder="example@example.com"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>メッセージ</Label>
        <TextArea 
          {...register("message", { required: "メッセージは必須です" })}
          placeholder="お問い合わせ内容をご記入ください"
        />
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </FormGroup>

      <SubmitButton
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        送信する
      </SubmitButton>
    </FormContainer>
  );
}

export default ContactForm;
