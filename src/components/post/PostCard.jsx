import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import usePostStore from '../../store/postStore';

const Card = styled(motion.article)`
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: ${props => props.theme.spacing.sm};
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const TimeStamp = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const Content = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
  white-space: pre-wrap;
`;

const MediaGrid = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  grid-template-columns: ${props => 
    props.count === 1 ? '1fr' :
    props.count === 2 ? '1fr 1fr' :
    props.count === 3 ? '1fr 1fr' :
    props.count === 4 ? '1fr 1fr' : '1fr'
  };
  grid-template-rows: ${props =>
    props.count === 3 ? '1fr 1fr' :
    props.count === 4 ? '1fr 1fr' : '1fr'
  };

  ${props => props.count === 3 && `
    > :first-child {
      grid-row: 1 / -1;
    }
  `}
`;

const MediaContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  cursor: pointer;

  img, video {
    width: 100%;
    height: 100%;
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
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.text.secondary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

function PostCard({ post }) {
  const { likePost, addComment, sharePost } = usePostStore();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    likePost(post.id);
    setIsLiked(true);
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Avatar src={post.author.avatar} alt={post.author.name} />
        <UserInfo>
          <UserName>{post.author.name}</UserName>
          <TimeStamp>
            {format(new Date(post.createdAt), 'PP', { locale: ja })}
          </TimeStamp>
        </UserInfo>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <FiMoreHorizontal />
        </motion.button>
      </Header>

      <Content>{post.content}</Content>

      {post.media && post.media.length > 0 && (
        <MediaGrid count={post.media.length}>
          {post.media.map((media, index) => (
            <MediaContainer key={media.id}>
              {media.type === 'image' ? (
                <img src={media.url} alt="" />
              ) : (
                <video src={media.url} controls />
              )}
            </MediaContainer>
          ))}
        </MediaGrid>
      )}

      <Actions>
        <ActionButton
          onClick={handleLike}
          active={isLiked}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiHeart />
          <span>{post.likes}</span>
        </ActionButton>
        <ActionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiMessageCircle />
          <span>{post.comments.length}</span>
        </ActionButton>
        <ActionButton
          onClick={() => sharePost(post.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiShare2 />
          <span>{post.shares}</span>
        </ActionButton>
      </Actions>
    </Card>
  );
}

export default PostCard;
