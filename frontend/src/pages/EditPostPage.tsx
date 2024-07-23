import { Link as RouterLink } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

import EditPostForm from '../components/EditPostForm';

const EditPostPage = () => {
    return (
        <Container maxWidth="md" data-testid="editpostpage-container">
            <Box display="flex" alignItems="center" mb={3}>
                <Button
                    component={RouterLink}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mr: 2 }}
                    data-testid="editpostpage-back-btn"
                >
                    Back
                </Button>
                <Typography
                    variant="h5"
                    component="h2"
                    data-testid="editpostpage-title"
                >
                    Edit Post
                </Typography>
            </Box>
            <Paper elevation={0} sx={{ p: 3 }} data-testid="editpostpage-paper">
                <EditPostForm />
            </Paper>
        </Container>
    );
};

export default EditPostPage;
