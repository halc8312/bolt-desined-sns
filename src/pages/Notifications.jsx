import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiUserPlus } from 'react-icons/fi';

const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const NotificationItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.background.tertiary};
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationText = styled.p`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const NotificationTime = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const mockNotifications = [
  {
    id: 1,
    type: 'like',
    text: '田中さんがあなたの投稿にいいねしました',
    time: '5分前',
    icon: <FiHeart />
  },
  {
    id: 2,
    type: 'comment',
    text: '佐藤さんがあなたの投稿にコメントしました',
    time: '30分前',
    icon: <FiMessageCircle />
  },
  {
    id: 3,
    type: 'follow',
    text: '山田さんがあなたをフォローしました',
    time: '1時間前',
    icon: <FiUserPlus />
  }
];

function Notifications() {
  return (
    <NotificationsContainer>
      {mockNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <IconWrapper>{notification.icon}</IconWrapper>
          <NotificationContent>
            <NotificationText>{notification.text}</NotificationText>
            <NotificationTime>{notification.time}</NotificationTime>
          </NotificationContent>
        </NotificationItem>
      ))}
    </NotificationsContainer>
  );
}

export default Notifications;
