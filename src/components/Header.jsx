import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
`

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #0066cc;
  }
`

function Header() {
  return (
    <HeaderContainer>
      <Logo>Modern Visual SNS</Logo>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/profile">Profile</StyledLink>
      </Nav>
    </HeaderContainer>
  )
}

export default Header
