import { Post, PostsState } from '@/src/types/postTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    fetchPosts,
    addNewPost,
    updatePost,
    deletePost,
} from '../thunks/postsThunks';

const initialState: PostsState = {
    posts: [],
    status: 'idle',
    error: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchPosts.fulfilled,
                (state, action: PayloadAction<Post[]>) => {
                    state.status = 'succeeded';
                    state.posts = action.payload;
                },
            )
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(
                addNewPost.fulfilled,
                (state, action: PayloadAction<Post>) => {
                    state.posts.push(action.payload);
                },
            )
            .addCase(
                updatePost.fulfilled,
                (state, action: PayloadAction<Post>) => {
                    const index = state.posts.findIndex(
                        (post) => post.id === action.payload.id,
                    );
                    if (index !== -1) {
                        state.posts[index] = action.payload;
                    }
                },
            )
            .addCase(
                deletePost.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.posts = state.posts.filter(
                        (post) => post.id !== action.payload,
                    );
                },
            );
    },
});

export default postsSlice.reducer;
