import { describe, it, expect, beforeEach } from 'vitest';

import { Post, PostsState, PostData } from '@/src/types/postTypes';

import { createTestStore } from './utils/createTestStore';

import {
    fetchPosts,
    addNewPost,
    updatePost,
    deletePost,
} from '../redux/thunks/postsThunks';

// Mock data
const mockPosts: Post[] = [
    {
        id: 1,
        data: {
            body: 'This is the first post',
            author: 'Author One',
            created: 1625097600000,
            edited: 1625097600000,
            postId: 'post1',
        },
    },
    {
        id: 2,
        data: {
            body: 'This is the second post',
            author: 'Author Two',
            created: 1625184000000,
            edited: 1625184000000,
            postId: 'post2',
        },
    },
];

const initialState: PostsState = {
    posts: [],
    status: 'idle',
    error: null,
};

describe('postsSlice', () => {
    let store: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        store = createTestStore();
    });

    describe('Initial State', () => {
        it('should handle initial state', () => {
            expect(store.getState().posts).toEqual(initialState);
        });
    });

    describe('Fetch Posts', () => {
        it('should handle fetchPosts.pending', () => {
            store.dispatch(fetchPosts.pending('', undefined));
            const state = store.getState().posts;
            expect(state.status).toBe('loading');
            expect(state.error).toBeNull();
        });

        it('should handle fetchPosts.fulfilled', () => {
            store.dispatch(fetchPosts.fulfilled(mockPosts, ''));
            const state = store.getState().posts;
            expect(state.status).toBe('succeeded');
            expect(state.posts).toEqual(mockPosts);
            expect(state.error).toBeNull();
        });

        it('should handle fetchPosts.rejected', () => {
            const error = new Error('Failed to fetch posts');
            store.dispatch(fetchPosts.rejected(error, ''));
            const state = store.getState().posts;
            expect(state.status).toBe('failed');
            expect(state.error).toBe('Failed to fetch posts');
            expect(state.posts).toEqual([]);
        });
    });

    describe('Add New Post', () => {
        it('should handle addNewPost.fulfilled', () => {
            const newPost: PostData = {
                body: 'Content of new post',
                author: 'New Author',
                created: 1625270400000,
                edited: 1625270400000,
                postId: 'post3',
            };
            store.dispatch(
                addNewPost.fulfilled({ id: 3, data: newPost }, '', newPost),
            );
            const state = store.getState().posts;
            expect(state.posts).toHaveLength(1);
            expect(state.posts[0]).toEqual({ id: 3, data: newPost });
        });
    });

    describe('Update Post', () => {
        beforeEach(() => {
            store.dispatch(fetchPosts.fulfilled(mockPosts, ''));
        });

        it('should handle updatePost.fulfilled', () => {
            const updatedPostData: PostData = {
                body: 'Updated content',
                author: 'Updated Author',
                created: 1625097600000,
                edited: 1625356800000,
                postId: 'post1',
            };
            const updatedPost: Post = { id: 1, data: updatedPostData };

            store.dispatch(updatePost.fulfilled(updatedPost, '', updatedPost));
            const state = store.getState().posts;
            expect(state.posts).toHaveLength(2);
            expect(state.posts.find((post) => post.id === 1)).toEqual(
                updatedPost,
            );
        });

        it('should not update post if id is not found', () => {
            const nonExistentPost: Post = {
                id: 999,
                data: {
                    body: 'This post should not be added',
                    author: 'Non-existent',
                    created: 1625443200000,
                    edited: 1625443200000,
                    postId: 'non-existent',
                },
            };
            store.dispatch(
                updatePost.fulfilled(nonExistentPost, '', nonExistentPost),
            );
            const state = store.getState().posts;
            expect(state.posts).toEqual(mockPosts);
        });
    });

    describe('Delete Post', () => {
        beforeEach(() => {
            store.dispatch(fetchPosts.fulfilled(mockPosts, ''));
        });

        it('should handle deletePost.fulfilled', () => {
            store.dispatch(deletePost.fulfilled(1, '', 1));
            const state = store.getState().posts;
            expect(state.posts).toHaveLength(1);
            expect(state.posts.find((post) => post.id === 1)).toBeUndefined();
        });

        it('should not change state if deleting non-existent post', () => {
            store.dispatch(deletePost.fulfilled(999, '', 999));
            const state = store.getState().posts;
            expect(state.posts).toEqual(mockPosts);
        });
    });
});
