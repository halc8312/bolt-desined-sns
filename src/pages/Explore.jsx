import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ExploreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const ExploreItem = styled(motion.div)`
  aspect-ratio: 1;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  position: relative;
`;

const ExploreImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ExploreOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const mockExploreItems = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300',
    title: '人気の投稿'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300',
    title: 'トレンド'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300',
    title: '注目のユーザー'
  }
];

function Explore() {
  return (
    <ExploreContainer>
      {mockExploreItems.map((item) => (
        <ExploreItem
          key={item.id}
          whileHover="hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ExploreImage src={item.image} alt={item.title} />
          <ExploreOverlay
            variants={{
              hover: { opacity: 1 }
            }}
          >
            {item.title}
          </ExploreOverlay>
        </ExploreItem>
      ))}
    </ExploreContainer>
  );
}

export default Explore;
