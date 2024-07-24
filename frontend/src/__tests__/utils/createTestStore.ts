import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../redux/slices/postsSlice';
import { RootState } from '@/src/redux/store';


export const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState,
  });
};