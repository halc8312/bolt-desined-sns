import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import usePostStore from '../../store/postStore';

const Container = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.background.tertiary};
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.background.tertiary};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.base};
  resize: none;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Comment = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const UserName = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const TimeStamp = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const CommentText = styled.p`
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  align-self: flex-end;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function CommentSection({ postId }) {
  const [comment, setComment] = useState('');
  const { addComment, posts } = usePostStore();
  const post = posts.find(p => p.id === postId);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    addComment(postId, comment);
    setComment('');
  };

  return (
    <Container>
      <CommentInput
        placeholder="コメントを入力..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <Button
        onClick={handleSubmit}
        disabled={!comment.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        コメントする
      </Button>

      <CommentList>
        <AnimatePresence>
          {post?.comments.map((comment, index) => (
            <Comment
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Avatar src={comment.author.avatar} alt={comment.author.name} />
              <CommentContent>
                <CommentHeader>
                  <UserName>{comment.author.name}</UserName>
                  <TimeStamp>
                    {format(new Date(comment.createdAt), 'PP', { locale: ja })}
                  </TimeStamp>
                </CommentHeader>
                <CommentText>{comment.content}</CommentText>
              </CommentContent>
            </Comment>
          ))}
        </AnimatePresence>
      </CommentList>
    </Container>
  );
}

export default CommentSection;
