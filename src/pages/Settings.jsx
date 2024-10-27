import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text.primary};
`;

const Section = styled.section`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const Input = styled.input`
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
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  align-self: flex-start;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  appearance: none;
  width: 50px;
  height: 26px;
  background: ${props => props.checked ? props.theme.colors.accent : props.theme.colors.background.tertiary};
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;

  &::before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    background: white;
    transition: left 0.3s;
  }
`;

function Settings() {
  const { user, updateProfile } = useAuthStore();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // プロフィール更新のロジックを実装
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <SettingsContainer>
      <Title>設定</Title>

      <Section>
        <SectionTitle>プロフィール設定</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>表示名</Label>
            <Input 
              type="text" 
              defaultValue={user?.name}
              placeholder="表示名"
            />
          </FormGroup>
          <FormGroup>
            <Label>自己紹介</Label>
            <Input 
              type="text" 
              defaultValue={user?.bio}
              placeholder="自己紹介"
            />
          </FormGroup>
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            保存
          </Button>
        </Form>
      </Section>

      <Section>
        <SectionTitle>通知設定</SectionTitle>
        <FormGroup>
          <Toggle>
            <ToggleInput
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
            メール通知
          </Toggle>
          <Toggle>
            <ToggleInput
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationChange('push')}
            />
            プッシュ通知
          </Toggle>
          <Toggle>
            <ToggleInput
              type="checkbox"
              checked={notifications.marketing}
              onChange={() => handleNotificationChange('marketing')}
            />
            マーケティング通知
          </Toggle>
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>アカウント設定</SectionTitle>
        <Form>
          <FormGroup>
            <Label>メールアドレス</Label>
            <Input 
              type="email" 
              defaultValue={user?.email}
              placeholder="メールアドレス"
            />
          </FormGroup>
          <FormGroup>
            <Label>新しいパスワード</Label>
            <Input 
              type="password" 
              placeholder="新しいパスワード"
            />
          </FormGroup>
          <FormGroup>
            <Label>パスワードの確認</Label>
            <Input 
              type="password" 
              placeholder="パスワードの確認"
            />
          </FormGroup>
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            更新
          </Button>
        </Form>
      </Section>
    </SettingsContainer>
  );
}

export default Settings;
