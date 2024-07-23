import { Link as RouterLink } from 'react-router-dom';

import TwitterIcon from '@mui/icons-material/Twitter';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="primary" data-testid="header">
      <Toolbar>
        <TwitterIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Twitter
          </Button>
        </Typography>

        <Box>
          <Button color="inherit" component={RouterLink} to="/" data-testid="header-btn-home">
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;