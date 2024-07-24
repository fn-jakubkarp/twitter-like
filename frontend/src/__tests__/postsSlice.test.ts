import { describe, it, expect } from 'vitest';

import { Post, PostsState } from '@/src/types/postTypes';
import { PostData } from '@/src/types/postTypes';
import { configureStore } from '@reduxjs/toolkit';
import { createTestStore } from './utils/createTestStore';
import postsReducer from '../redux/slices/postsSlice';
import { fetchPosts, addNewPost, updatePost, deletePost } from '../redux/thunks/postsThunks';

const mockPosts: Post[] = [
  {
    id: 1,
    data: {
      body: 'This is the first post',
      author: 'Author One',
      created: Date.now(),
      edited: Date.now(),
      postId: 'post1',
    },
  },
  {
    id: 2,
    data: {
      body: 'This is the second post',
      author: 'Author Two',
      created: Date.now(),
      edited: Date.now(),
      postId: 'post2',
    },
  },
];

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

const store = configureStore({
  reducer: { posts: postsReducer },
});

describe('postsSlice', () => {
  it('should handle initial state', () => {
    expect(store.getState().posts).toEqual(initialState);
  });

  it('should handle fetchPosts.pending', () => {
    const action = fetchPosts.pending(undefined, undefined);
    store.dispatch(action);

    const state = store.getState().posts;
    expect(state.status).toBe('loading');
  });

  it('should handle fetchPosts.fulfilled', () => {
    const action = fetchPosts.fulfilled(mockPosts, 'someId');
    store.dispatch(action);

    const state = store.getState().posts;
    expect(state.status).toBe('succeeded');
    expect(state.posts).toEqual(mockPosts);
  });

  it('should handle fetchPosts.rejected', () => {
    const action = fetchPosts.rejected(new Error('Failed to fetch posts'), 'someId');
    store.dispatch(action);

    const state = store.getState().posts;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch posts');
  });

  it('should handle addNewPost.fulfilled', () => {
    const newPost = {
      body: 'Content of new post',
      author: 'New Author',
      created: Date.now(),
      edited: Date.now(),
      postId: 'post3',
    };
    const action = addNewPost.fulfilled({ id: 3, data: newPost }, 'someId', newPost);
    store.dispatch(action);

    const state = store.getState().posts;
    expect(state.posts).toContainEqual({ id: 3, data: newPost });
  });

  it('should handle updatePost.fulfilled', () => {
    const updatedPostData: PostData = {
      body: 'Updated content',
      author: 'Updated Author',
      created: Date.now(),
      edited: Date.now(),
      postId: 'post1',
    };

    const updatedPost: Post = {
      id: 1,
      data: updatedPostData,
    };

    store.dispatch(addNewPost.fulfilled({ id: 1, data: mockPosts[0].data }, 'someId', mockPosts[0].data));

    const action = updatePost.fulfilled({ id: 1, data: updatedPost }, 'someId', updatedPost);
    store.dispatch(action);

    const state = store.getState().posts;
    expect(state.posts).toContainEqual({ id: 1, data: updatedPost });
  });

  it('should handle deletePost.fulfilled', () => {
    store.dispatch(addNewPost.fulfilled({ id: 1, data: mockPosts[0].data }, 'someId', mockPosts[0].data));
    const action = deletePost.fulfilled(1, 'someId', 1);
    store.dispatch(action);

    const state = store.getState().posts;
    expect(state.posts).not.toContainEqual({ id: 1, data: mockPosts[0].data });
  });
});
