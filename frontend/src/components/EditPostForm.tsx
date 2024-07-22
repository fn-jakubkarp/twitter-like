import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { TextField, Button, Box } from '@mui/material';

import { RootState, AppDispatch } from '../redux/store';
import { updatePost } from '../redux/thunks/postsThunks';

const EditPostForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const post = useSelector((state: RootState) =>
        state.posts.posts.find((post) => post.id === Number(id)),
    );

    const [author, setAuthor] = useState(post?.data.author || '');
    const [body, setBody] = useState(post?.data.body || '');

    useEffect(() => {
        if (post) {
            setAuthor(post.data.author);
            setBody(post.data.body);
        }
    }, [post]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (author && body && post) {
            dispatch(
                updatePost({
                    ...post,
                    data: {
                        ...post.data,
                        author,
                        body,
                        edited: Math.floor(Date.now() / 1000),
                    },
                }),
            );
            navigate('/');
        }
    };

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                fullWidth
                label="Author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                margin="normal"
                data-testid="editpostform-author-input"
            />
            <TextField
                fullWidth
                label="Post Content"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                margin="normal"
                multiline
                rows={4}
                data-testid="editpostform-body-input"
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                data-testid="editpostform-submit-btn"
            >
                Update Post
            </Button>
        </Box>
    );
};

export default EditPostForm;
