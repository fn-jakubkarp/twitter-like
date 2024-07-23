import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

import { RootState, AppDispatch } from '../redux/store';
import { fetchPosts, deletePost } from '../redux/thunks/postsThunks';

const PostList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const status = useSelector((state: RootState) => state.posts.status);
    const error = useSelector((state: RootState) => state.posts.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleDelete = (id: number) => {
        dispatch(deletePost(id));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        throw new Error(`Failed to retrieve PostList: ${error}`);
    }

    return (
        <Grid container spacing={3} data-testid="postlist-container">
            {posts.map((post) => (
                <Grid
                    item
                    xs={12}
                    key={post.id}
                    data-testid={`post-item-${post.id}`}
                >
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                data-testid={`post-author-${post.id}`}
                            >
                                {post.data.author}
                            </Typography>
                            <Typography
                                variant="body1"
                                data-testid={`post-body-${post.id}`}
                            >
                                {post.data.body}
                            </Typography>
                            <Typography
                                variant="caption"
                                data-testid={`post-created-${post.id}`}
                            >
                                Created:{' '}
                                {new Date(
                                    post.data.created * 1000,
                                ).toLocaleString()}
                            </Typography>
                            <Button
                                component={Link}
                                to={`/edit/${post.id}`}
                                data-testid={`post-edit-btn-${post.id}`}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => handleDelete(post.id)}
                                data-testid={`post-delete-btn-${post.id}`}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PostList;
