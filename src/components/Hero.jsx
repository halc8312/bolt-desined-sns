import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 4rem);
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const BackgroundText = styled(motion.div)`
  position: absolute;
  font-size: clamp(10rem, 20vw, 20rem);
  opacity: 0.03;
  font-family: var(--font-serif);
  white-space: nowrap;
  user-select: none;
`;

function Hero() {
  return (
    <HeroContainer>
      <BackgroundText
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        和のモダン 日本の美
      </BackgroundText>
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          伝統と革新の融合
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          日本の美意識と現代のデザインを組み合わせ、
          新しい価値を創造します。
        </Subtitle>
      </HeroContent>
    </HeroContainer>
  );
}

export default Hero;
