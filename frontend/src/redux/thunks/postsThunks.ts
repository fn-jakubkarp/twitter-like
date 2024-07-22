import axios from 'axios';

import { Post } from '@/src/types/postTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk<Post[], void>(
    'posts/fetchPosts',
    async () => {
        const response = await axios.get('http://localhost:3000/api/posts');
        return response.data;
    },
);

export const addNewPost = createAsyncThunk<
    Post,
    { author: string; body: string }
>('posts/addNewPost', async (newPost) => {
    const now = Math.floor(Date.now() / 1000);
    const postId = Math.random().toString(36).slice(2, 8);

    const postData = {
        data: {
            ...newPost,
            created: now,
            edited: now,
            postId: postId,
        },
    };

    const response = await axios.post(
        'http://localhost:3000/api/posts',
        postData,
    );
    return response.data;
});

export const updatePost = createAsyncThunk<Post, Post>(
    'posts/updatePost',
    async (updatedPost) => {
        const response = await axios.put(
            `http://localhost:3000/api/posts/${updatedPost.id}`,
            updatedPost,
        );
        return response.data;
    },
);

export const deletePost = createAsyncThunk<number, number>(
    'posts/deletePost',
    async (id) => {
        await axios.delete(`http://localhost:3000/api/posts/${id}`);
        return id;
    },
);
