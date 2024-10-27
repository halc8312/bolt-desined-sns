import create from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      // 実際のAPI呼び出しの代わりにモックデータを使用
      await new Promise(resolve => setTimeout(resolve, 1000)); // 遅延を追加
      
      const mockUser = {
        id: '1',
        name: 'テストユーザー',
        username: 'testuser',
        email: credentials.email,
        avatar: 'https://via.placeholder.com/150'
      };
      
      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'ログインに失敗しました。', 
        loading: false 
      });
    }
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: { ...state.user, ...updates }
    }));
  }
}));

export default useAuthStore;
