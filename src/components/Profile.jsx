import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`

const ProfileName = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
`

const ProfileBio = styled.p`
  font-size: 1rem;
  color: #666;
  max-width: 500px;
  text-align: center;
`

function Profile() {
  return (
    <ProfileContainer>
      <ProfileImage
        src="https://source.unsplash.com/random/300x300?portrait"
        alt="Profile"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
      <ProfileName>John Doe</ProfileName>
      <ProfileBio>
        Passionate photographer and traveler. Always seeking new adventures and capturing beautiful moments through my lens.
      </ProfileBio>
    </ProfileContainer>
  )
}

export default Profile
