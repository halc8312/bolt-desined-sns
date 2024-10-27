import create from 'zustand';
import { persist } from 'zustand/middleware';

const usePostStore = create(
  persist(
    (set, get) => ({
      posts: [],
      loading: false,
      error: null,
      
      createPost: async (content, mediaFiles) => {
        set({ loading: true, error: null });
        try {
          const newPost = {
            id: Date.now().toString(),
            content,
            media: mediaFiles.map(file => ({
              id: Math.random().toString(36).substr(2, 9),
              url: URL.createObjectURL(file),
              type: file.type.startsWith('image/') ? 'image' : 'video'
            })),
            author: get().currentUser,
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: [],
            shares: 0
          };
          
          set(state => ({
            posts: [newPost, ...state.posts],
            loading: false
          }));
          return true;
        } catch (error) {
          set({ error: '投稿の作成に失敗しました', loading: false });
          return false;
        }
      },

      likePost: (postId) => {
        set(state => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? { ...post, likes: post.likes + 1 }
              : post
          )
        }));
      },

      addComment: (postId, comment) => {
        set(state => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  comments: [...post.comments, {
                    id: Date.now().toString(),
                    content: comment,
                    author: get().currentUser,
                    createdAt: new Date().toISOString()
                  }]
                }
              : post
          )
        }));
      },

      sharePost: (postId) => {
        set(state => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? { ...post, shares: post.shares + 1 }
              : post
          )
        }));
      }
    }),
    {
      name: 'post-storage',
      getStorage: () => localStorage
    }
  )
);

export default usePostStore;
