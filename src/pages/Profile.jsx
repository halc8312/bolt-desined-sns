import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiEdit2, FiSettings, FiShare2 } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
`;

const CoverImage = styled.div`
  height: 200px;
  background: ${props => props.theme.colors.gradient.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: -2rem -2rem 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: -60px;
  padding: 0 1rem;
`;

const Avatar = styled(motion.img)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid ${props => props.theme.colors.background.secondary};
  background: ${props => props.theme.colors.background.primary};
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex: 1;
  margin-left: 2rem;
`;

const Name = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  margin-bottom: 0.5rem;
`;

const Username = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

const Bio = styled.p`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  max-width: 600px;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.variant === 'primary' 
    ? props.theme.colors.accent 
    : props.theme.colors.background.tertiary};
  color: ${props => props.variant === 'primary'
    ? 'white'
    : props.theme.colors.text.primary};
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeight.medium};

  &:hover {
    opacity: 0.9;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.background.tertiary};
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem;
  background: none;
  border: none;
  color: ${props => props.active 
    ? props.theme.colors.accent 
    : props.theme.colors.text.secondary};
  font-weight: ${props => props.active 
    ? props.theme.typography.fontWeight.bold 
    : props.theme.typography.fontWeight.normal};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active 
      ? props.theme.colors.accent 
      : 'transparent'};
  }
`;

function Profile() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('posts');

  const mockUser = {
    ...user,
    bio: "デジタルクリエイター / UI/UXデザイナー / 写真愛好家",
    stats: {
      posts: 42,
      followers: 1234,
      following: 567
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <CoverImage />
        <ProfileInfo>
          <Avatar
            src={mockUser.avatar}
            alt={mockUser.name}
            whileHover={{ scale: 1.05 }}
          />
          <UserInfo>
            <Name>{mockUser.name}</Name>
            <Username>@{mockUser.username}</Username>
            <Bio>{mockUser.bio}</Bio>
            <Stats>
              <StatItem>
                <StatValue>{mockUser.stats.posts}</StatValue>
                <StatLabel>投稿</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{mockUser.stats.followers}</StatValue>
                <StatLabel>フォロワー</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{mockUser.stats.following}</StatValue>
                <StatLabel>フォロー中</StatLabel>
              </StatItem>
            </Stats>
            <Actions>
              <ActionButton
                variant="primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiEdit2 />
                プロフィールを編集
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiSettings />
                設定
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiShare2 />
                シェア
              </ActionButton>
            </Actions>
          </UserInfo>
        </ProfileInfo>
      </ProfileHeader>

      <TabsContainer>
        <Tab
          active={activeTab === 'posts'}
          onClick={() => setActiveTab('posts')}
        >
          投稿
        </Tab>
        <Tab
          active={activeTab === 'media'}
          onClick={() => setActiveTab('media')}
        >
          メディア
        </Tab>
        <Tab
          active={activeTab === 'likes'}
          onClick={() => setActiveTab('likes')}
        >
          いいね
        </Tab>
      </TabsContainer>

      {/* タブコンテンツはここに実装 */}
    </ProfileContainer>
  );
}

export default Profile;
