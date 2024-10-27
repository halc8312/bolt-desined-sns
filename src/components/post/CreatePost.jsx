import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiImage, FiVideo, FiSmile } from 'react-icons/fi';
import { Button } from '../ui/Button';
import usePostStore from '../../store/postStore';

const Container = styled.div`
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.base};
  resize: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.accent};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MediaButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  
  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.accent};
  }
`;

function CreatePost() {
  const [content, setContent] = useState('');
  const { createPost, loading } = usePostStore();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await createPost(content);
    setContent('');
  };

  return (
    <Container>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="今何してる？"
      />
      <Actions>
        <MediaButtons>
          <IconButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiImage />
          </IconButton>
          <IconButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiVideo />
          </IconButton>
          <IconButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiSmile />
          </IconButton>
        </MediaButtons>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || loading}
          as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? '投稿中...' : '投稿する'}
        </Button>
      </Actions>
    </Container>
  );
}

export default CreatePost;
