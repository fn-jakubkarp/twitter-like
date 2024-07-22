import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { describe, it, expect, vi } from 'vitest';

import HomePage from '@/src/pages/HomePage';
import { render, screen } from '@testing-library/react';

import { createTestStore } from '../utils/createTestStore';

vi.mock('../../../src/components/CreatePostForm.tsx', () => ({
    default: () => (
        <div data-testid="mock-create-post-form">CreatePostForm</div>
    ),
}));
vi.mock('../../../src/components/PostList.tsx', () => ({
    default: () => <div data-testid="mock-post-list">PostList</div>,
}));

const store = createTestStore();

describe('HomePage Component', () => {
    const renderHomePage = () => {
        render(
            <Provider store={store}>
                <Router>
                    <HomePage />
                </Router>
            </Provider>,
        );
    };

    it('renders without crashing', () => {
        renderHomePage();
        expect(screen.getByTestId('homepage-container')).toBeDefined();
    });

    it('renders the title correctly', () => {
        renderHomePage();
        expect(screen.getByTestId('homepage-title')).toBeDefined();
        expect(screen.getByTestId('homepage-title').textContent).toBe('Home');
    });

    it('renders the CreatePostForm component', () => {
        renderHomePage();
        expect(screen.getByTestId('mock-create-post-form')).toBeDefined();
    });

    it('renders the PostList component', () => {
        renderHomePage();
        expect(screen.getByTestId('mock-post-list')).toBeDefined();
    });

    it('renders the divider', () => {
        renderHomePage();
        expect(screen.getByTestId('homepage-divider')).toBeDefined();
    });
});
