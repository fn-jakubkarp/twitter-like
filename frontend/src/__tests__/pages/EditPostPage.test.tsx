import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { describe, it, expect, vi } from 'vitest';

import EditPostPage from '@/src/pages/EditPostPage';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { createTestStore } from '../utils/createTestStore';

vi.mock('../../../src/components/EditPostForm.tsx', () => ({
    default: () => <div data-testid="mock-edit-post-form">EditPostForm</div>,
}));

const store = createTestStore();

describe('EditPostPage Component', () => {
    const renderEditPostPage = () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit-post']}>
                    <Routes>
                        <Route path="/edit-post" element={<EditPostPage />} />
                        <Route
                            path="/"
                            element={
                                <div data-testid="homepage-container">
                                    Home Page
                                </div>
                            }
                        />
                    </Routes>
                </MemoryRouter>
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
        expect(screen.getByTestId('editpostpage-title').textContent).toBe(
            'Edit Post',
        );
    });

    it('renders the EditPostForm component', () => {
        renderEditPostPage();
        expect(screen.getByTestId('mock-edit-post-form')).toBeDefined();
    });

    it('navigates to the home page on back button click', () => {
        renderEditPostPage();
        fireEvent.click(screen.getByTestId('editpostpage-back-btn'));
        expect(screen.getByTestId('homepage-container')).toBeInTheDocument();
    });
});
