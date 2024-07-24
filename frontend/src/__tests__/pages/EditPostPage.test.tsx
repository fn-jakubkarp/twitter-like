import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { describe, it, expect, vi } from 'vitest';

import EditPostPage from '@/src/pages/EditPostPage';
import { render, screen } from '@testing-library/react';

import { createTestStore } from '../utils/createTestStore';

vi.mock('../../../src/components/EditPostForm.tsx', () => ({
    default: () => (
        <div data-testid="mock-edit-post-form">EditPostForm</div>
    ),
}));

const store = createTestStore();

describe('EditPostPage Component', () => {
    const renderEditPostPage = () => {
        render(
            <Provider store={store}>
                <Router>
                    <EditPostPage />
                </Router>
            </Provider>,
        );
    };

    it('renders without crashing', () => {
        renderEditPostPage();
        expect(screen.getByTestId('editpostpage-container')).toBeDefined();
    });

    it('renders the title correctly', () => {
        renderEditPostPage();
        expect(screen.getByTestId('editpostpage-title')).toBeDefined();
        expect(screen.getByTestId('editpostpage-title').textContent).toBe('Edit Post');
    });

    it('renders the EditPostForm component', () => {
        renderEditPostPage();
        expect(screen.getByTestId('mock-edit-post-form')).toBeDefined();
    });
});
