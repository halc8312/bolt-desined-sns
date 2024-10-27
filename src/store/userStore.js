import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      users: [
        {
          id: '1',
          name: 'テストユーザー',
          username: 'testuser',
          avatar: 'https://via.placeholder.com/150',
          bio: 'テストユーザーです。',
          followers: [],
          following: [],
          posts: []
        }
      ],
      searchResults: [],
      loading: false,
      error: null,

      // フォロー機能
      followUser: (targetUserId) => {
        const currentUser = get().users.find(user => user.id === get().currentUserId);
        if (!currentUser) return;

        set(state => ({
          users: state.users.map(user => {
            if (user.id === currentUser.id) {
              return {
                ...user,
                following: [...user.following, targetUserId]
              };
            }
            if (user.id === targetUserId) {
              return {
                ...user,
                followers: [...user.followers, currentUser.id]
              };
            }
            return user;
          })
        }));
      },

      // フォロー解除機能
      unfollowUser: (targetUserId) => {
        const currentUser = get().users.find(user => user.id === get().currentUserId);
        if (!currentUser) return;

        set(state => ({
          users: state.users.map(user => {
            if (user.id === currentUser.id) {
              return {
                ...user,
                following: user.following.filter(id => id !== targetUserId)
              };
            }
            if (user.id === targetUserId) {
              return {
                ...user,
                followers: user.followers.filter(id => id !== currentUser.id)
              };
            }
            return user;
          })
        }));
      },

      // ユーザー検索機能
      searchUsers: (query) => {
        if (!query.trim()) {
          set({ searchResults: [] });
          return;
        }

        const results = get().users.filter(user =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase())
        );

        set({ searchResults: results });
      },

      // ユーザープロフィールの更新
      updateUserProfile: (userId, updates) => {
        set(state => ({
          users: state.users.map(user =>
            user.id === userId
              ? { ...user, ...updates }
              : user
          )
        }));
      }
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage
    }
  )
);

export default useUserStore;
