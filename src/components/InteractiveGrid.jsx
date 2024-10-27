import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

const GridItem = styled(motion.div)`
  aspect-ratio: 1;
  background: var(--color-accent);
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1 }
};

function InteractiveGrid() {
  return (
    <Grid as={motion.div} variants={container} initial="hidden" animate="show">
      {Array.from({ length: 6 }).map((_, i) => (
        <GridItem
          key={i}
          variants={item}
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        />
      ))}
    </Grid>
  );
}

export default InteractiveGrid;
