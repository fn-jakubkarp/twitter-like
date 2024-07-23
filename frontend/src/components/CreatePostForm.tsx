import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TextField, Button, Box } from '@mui/material';

import { AppDispatch } from '../redux/store';
import { addNewPost } from '../redux/thunks/postsThunks';

const CreatePostForm: React.FC = () => {
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (author && body) {
            dispatch(addNewPost({ author, body }));
            setAuthor('');
            setBody('');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            data-testid="createpostform-container"
        >
            <TextField
                fullWidth
                label="Author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                margin="normal"
                data-testid="createpostform-author-input"
            />
            <TextField
                fullWidth
                label="Post Content"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                margin="normal"
                multiline
                rows={4}
                data-testid="createpostform-body-input"
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                data-testid="createpostform-submit-btn"
            >
                Create Post
            </Button>
        </Box>
    );
};

export default CreatePostForm;
