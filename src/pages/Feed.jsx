import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import PostCard from '../components/post/PostCard';
import CreatePostModal from '../components/post/CreatePostModal';
import usePostStore from '../store/postStore';

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const CreatePostButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 100;
`;

function Feed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { posts } = usePostStore();

  return (
    <FeedContainer>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <CreatePostButton
        onClick={() => setShowCreatePost(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiPlus size={24} />
      </CreatePostButton>

      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
    </FeedContainer>
  );
}

export default Feed;
