import { RootState } from '@/src/redux/store';
import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../../redux/slices/postsSlice';

export const createTestStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: {
            posts: postsReducer,
        },
        preloadedState,
    });
};
