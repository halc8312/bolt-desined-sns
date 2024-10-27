import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const MessageItem = styled(motion.div)`
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

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageContent = styled.div`
  flex: 1;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Username = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const Time = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const LastMessage = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const mockMessages = [
  {
    id: 1,
    username: '田中さん',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'お疲れ様です！',
    time: '5分前'
  },
  {
    id: 2,
    username: '佐藤さん',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: '了解です！',
    time: '30分前'
  }
];

function Messages() {
  return (
    <MessagesContainer>
      {mockMessages.map((message) => (
        <MessageItem
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <Avatar src={message.avatar} alt={message.username} />
          <MessageContent>
            <MessageHeader>
              <Username>{message.username}</Username>
              <Time>{message.time}</Time>
            </MessageHeader>
            <LastMessage>{message.lastMessage}</LastMessage>
          </MessageContent>
        </MessageItem>
      ))}
    </MessagesContainer>
  );
}

export default Messages;
