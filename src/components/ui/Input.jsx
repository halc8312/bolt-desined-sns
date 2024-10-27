import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.background.tertiary};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.base};
  transition: all 0.2s ${props => props.theme.animations.easing.easeInOut};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${props => `${props.theme.colors.accent}33`};
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }

  &:disabled {
    background: ${props => props.theme.colors.background.tertiary};
    cursor: not-allowed;
  }
`;

export const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 100px;
  resize: vertical;
`;
