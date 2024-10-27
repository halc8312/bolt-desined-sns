import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled(motion.button)`
  padding: ${({ size = 'md' }) => {
    switch (size) {
      case 'sm': return '0.5rem 1rem';
      case 'lg': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  font-size: ${({ size = 'md' }) => {
    switch (size) {
      case 'sm': return '0.875rem';
      case 'lg': return '1.125rem';
      default: return '1rem';
    }
  }};
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ${props => props.theme.animations.easing.easeInOut};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: transparent;
          border: 2px solid var(--color-accent);
          color: var(--color-accent);
          
          &:hover {
            background: var(--color-accent);
            color: white;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--color-text);
          
          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
        `;
      default:
        return `
          background: var(--color-accent);
          color: white;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: ${props => props.theme.shadows.md};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: ${props => props.fullWidth ? '100%' : 'auto'};
  }
`;
