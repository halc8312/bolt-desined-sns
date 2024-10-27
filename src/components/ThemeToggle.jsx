import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--color-text);
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <ToggleButton
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </ToggleButton>
  );
}

export default ThemeToggle;
