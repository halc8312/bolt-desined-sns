import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background.primary};
`;

const MainContent = styled.main`
  width: min(var(--max-width), 100%);
  margin: 0 auto;
  padding: var(--header-height) var(--content-padding) 20px;
  min-height: calc(100vh - var(--header-height));
  background-color: ${props => props.theme.colors.background.primary};

  @media (max-width: 768px) {
    padding-bottom: 80px;
  }
`;

function Layout({ children, showNavigation = true }) {
  return (
    <LayoutWrapper>
      {showNavigation && <Navigation />}
      <MainContent>{children}</MainContent>
    </LayoutWrapper>
  );
}

export default Layout;
