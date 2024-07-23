import { Container, Typography, Grid, Paper, Divider } from '@mui/material';

import CreatePostForm from '../components/CreatePostForm';
import PostList from '../components/PostList';

const HomePage = () => {
  return (
    <Container maxWidth="lg" data-testid="homepage-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 2, mb: 3 }} data-testid="homepage-paper">
            <Typography variant="h5" component="h2" gutterBottom data-testid="homepage-title">
              Home
            </Typography>
            <CreatePostForm />
          </Paper>
          <Divider sx={{ mb: 3 }} data-testid="homepage-divider"/>
          <PostList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;