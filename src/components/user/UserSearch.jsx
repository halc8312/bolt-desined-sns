import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import useUserStore from '../../store/userStore';

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 3rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.base};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.accent};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text.secondary};
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: ${props => props.theme.colors.background.tertiary};
  }
`;

const ResultsContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  margin-top: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
`;

const UserItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const Username = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

function UserSearch({ onUserSelect }) {
  const [query, setQuery] = useState('');
  const { searchUsers, searchResults } = useUserStore();

  useEffect(() => {
    if (query.trim()) {
      searchUsers(query);
    }
  }, [query, searchUsers]);

  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder="ユーザーを検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ClearButton onClick={() => setQuery('')}>
          <FiX />
        </ClearButton>
      )}

      <AnimatePresence>
        {query && searchResults.length > 0 && (
          <ResultsContainer
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {searchResults.map((user) => (
              <UserItem
                key={user.id}
                onClick={() => onUserSelect(user)}
                whileHover={{ scale: 1.02 }}
              >
                <Avatar src={user.avatar} alt={user.name} />
                <UserInfo>
                  <Name>{user.name}</Name>
                  <Username>@{user.username}</Username>
                </UserInfo>
              </UserItem>
            ))}
          </ResultsContainer>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
}

export default UserSearch;
