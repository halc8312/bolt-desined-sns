import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiImage, FiVideo, FiSmile } from 'react-icons/fi';
import usePostStore from '../../store/postStore';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.lg};
  resize: none;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.accent};
  }
`;

const MediaPreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MediaPreview = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;

  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    padding: 0.25rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const MediaButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const MediaButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.accent};
  }
`;

const PostButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

function CreatePostModal({ onClose }) {
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const { createPost, loading } = usePostStore();
  const fileInputRef = useRef(null);

  const handleMediaSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    setMediaFiles(prev => [...prev, ...validFiles].slice(0, 4));
  };

  const handleRemoveMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim() && mediaFiles.length === 0) return;
    
    const success = await createPost(content, mediaFiles);
    if (success) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <FiX size={24} />
          </CloseButton>

          <TextArea
            placeholder="今何してる？"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />

          {mediaFiles.length > 0 && (
            <MediaPreviewContainer>
              {mediaFiles.map((file, index) => (
                <MediaPreview key={index}>
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="Preview" />
                  ) : (
                    <video src={URL.createObjectURL(file)} controls />
                  )}
                  <button onClick={() => handleRemoveMedia(index)}>
                    <FiX />
                  </button>
                </MediaPreview>
              ))}
            </MediaPreviewContainer>
          )}

          <Actions>
            <MediaButtons>
              <HiddenInput
                type="file"
                ref={fileInputRef}
                accept="image/*,video/*"
                multiple
                onChange={handleMediaSelect}
              />
              <MediaButton
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={mediaFiles.length >= 4}
              >
                <FiImage size={24} />
              </MediaButton>
              <MediaButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiSmile size={24} />
              </MediaButton>
            </MediaButtons>

            <PostButton
              onClick={handleSubmit}
              disabled={loading || (!content.trim() && mediaFiles.length === 0)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? '投稿中...' : '投稿する'}
            </PostButton>
          </Actions>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
}

export default CreatePostModal;
