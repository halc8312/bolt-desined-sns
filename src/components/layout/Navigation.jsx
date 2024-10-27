import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCompass, FiMessageCircle, FiUser, FiBell, FiSun, FiMoon } from 'react-icons/fi';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background.primary};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: color 0.2s ${props => props.theme.animations.easing.easeInOut};

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

function Navigation({ toggleTheme }) {
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(false);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    toggleTheme();
  };

  const navItems = [
    { icon: <FiHome />, label: 'ホーム', path: '/' },
    { icon: <FiCompass />, label: '発見', path: '/explore' },
    { icon: <FiMessageCircle />, label: 'メッセージ', path: '/messages' },
    { icon: <FiBell />, label: '通知', path: '/notifications' },
    { icon: <FiUser />, label: 'プロフィール', path: '/profile' },
  ];

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <NavContent>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            active={location.pathname === item.path}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavItem>
        ))}
        <ThemeToggle
          onClick={handleThemeToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </ThemeToggle>
      </NavContent>
    </Nav>
  );
}

export default Navigation;
