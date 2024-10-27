import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUserPlus, FiUserMinus, FiEdit2 } from 'react-icons/fi';
import useUserStore from '../../store/userStore';

const ProfileContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Avatar = styled(motion.img)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  margin-bottom: 0.5rem;
`;

const Bio = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  background: ${props => props.variant === 'primary' ? props.theme.colors.accent : props.theme.colors.background.tertiary};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.background.tertiary};
`;

const Tab = styled.button`
  padding: 1rem;
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.text.secondary};
  font-weight: ${props => props.active ? props.theme.typography.fontWeight.bold : props.theme.typography.fontWeight.normal};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  }
`;

function UserProfile({ userId }) {
  const { users, followUser, unfollowUser } = useUserStore();
  const [activeTab, setActiveTab] = React.useState('posts');
  const user = users.find(u => u.id === userId);

  if (!user) return null;

  const isFollowing = user.followers.includes(userId);

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  return (
    <div>
      <ProfileContainer>
        <ProfileHeader>
          <Avatar
            src={user.avatar}
            alt={user.name}
            whileHover={{ scale: 1.05 }}
          />
          <UserInfo>
            <Username>{user.name}</Username>
            <Bio>{user.bio}</Bio>
            <Stats>
              <StatItem>
                <StatValue>{user.posts.length}</StatValue>
                <StatLabel>投稿</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{user.followers.length}</StatValue>
                <StatLabel>フォロワー</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{user.following.length}</StatValue>
                <StatLabel>フォロー中</StatLabel>
              </StatItem>
            </Stats>
            <ActionButton
              variant={isFollowing ? 'secondary' : 'primary'}
              onClick={handleFollowToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFollowing ? (
                <>
                  <FiUserMinus />
                  フォロー解除
                </>
              ) : (
                <>
                  <FiUserPlus />
                  フォローする
                </>
              )}
            </ActionButton>
          </UserInfo>
        </ProfileHeader>

        <TabContainer>
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
        </TabContainer>

        {/* タブコンテンツはここに実装 */}
      </ProfileContainer>
    </div>
  );
}

export default UserProfile;
