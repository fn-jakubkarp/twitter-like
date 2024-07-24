import React, { ErrorInfo, ReactNode } from 'react';

import { Box, Typography, Button, Container } from '@mui/material';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Oops! Something went wrong.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We're sorry for the inconvenience. Please try
                            reloading the page.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleReload}
                            data-testid="errorboundary-reload-btn"
                        >
                            Reload Page
                        </Button>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
