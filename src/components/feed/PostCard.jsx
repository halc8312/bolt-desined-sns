import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const Card = styled(motion.article)`
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${props => props.theme.spacing.sm};
`;

const UserName = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const TimeStamp = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-left: auto;
`;

const Content = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
`;

const MediaContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  
  img, video {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid ${props => props.theme.colors.background.tertiary};
  padding-top: ${props => props.theme.spacing.md};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ${props => props.theme.animations.easing.easeInOut};

  &:hover {
    color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.background.secondary};
  }

  svg {
    font-size: 1.25rem;
  }
`;

function PostCard({ post }) {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <UserInfo>
        <Avatar src={post.author.avatar} alt={post.author.name} />
        <UserName>{post.author.name}</UserName>
        <TimeStamp>
          {format(new Date(post.timestamp), 'PP', { locale: ja })}
        </TimeStamp>
      </UserInfo>

      <Content>{post.content}</Content>

      {post.media && (
        <MediaContainer>
          {post.media.type === 'image' ? (
            <img src={post.media.url} alt="" />
          ) : (
            <video src={post.media.url} controls />
          )}
        </MediaContainer>
      )}

      <Actions>
        <ActionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiHeart />
          <span>{post.likes}</span>
        </ActionButton>
        <ActionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMessageCircle />
          <span>{post.comments}</span>
        </ActionButton>
        <ActionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiShare2 />
          <span>{post.shares}</span>
        </ActionButton>
      </Actions>
    </Card>
  );
}

export default PostCard;
