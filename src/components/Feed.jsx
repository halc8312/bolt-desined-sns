import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

const Post = styled(motion.div)`
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const PostContent = styled.div`
  padding: 1rem;
`

const PostTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`

const PostDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`

const dummyPosts = [
  { id: 1, title: 'Beautiful Sunset', image: 'https://source.unsplash.com/random/800x600?sunset', description: 'A stunning view of the sunset at the beach.' },
  { id: 2, title: 'City Lights', image: 'https://source.unsplash.com/random/800x600?city', description: 'The vibrant city lights at night.' },
  { id: 3, title: 'Mountain Adventure', image: 'https://source.unsplash.com/random/800x600?mountain', description: 'Exploring the majestic mountains.' },
]

function Feed() {
  return (
    <FeedContainer>
      {dummyPosts.map((post) => (
        <Post
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PostImage src={post.image} alt={post.title} />
          <PostContent>
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>{post.description}</PostDescription>
          </PostContent>
        </Post>
      ))}
    </FeedContainer>
  )
}

export default Feed
