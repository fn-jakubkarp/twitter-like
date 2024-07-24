import React from 'react';
import { Provider } from 'react-redux';

import { render, screen, fireEvent } from '@testing-library/react';

import { createTestStore } from './utils/createTestStore';

import CreatePostForm from '../components/CreatePostForm';
import PostList from '../components/PostList';
import EditPostPage from '../pages/EditPostPage';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
    it('renders correctly', () => {
        render(
            <Provider store={createTestStore()}>
                <HomePage />
            </Provider>,
        );
        expect(screen.getByTestId('homepage-container')).toBeInTheDocument();
        expect(screen.getByTestId('homepage-title')).toHaveTextContent('Home');
    });
});

describe('EditPostPage', () => {
    it('renders correctly', () => {
        render(
            <Provider store={createTestStore()}>
                <EditPostPage />
            </Provider>,
        );
        expect(
            screen.getByTestId('editpostpage-container'),
        ).toBeInTheDocument();
        expect(screen.getByTestId('editpostpage-title')).toHaveTextContent(
            'Edit Post',
        );
    });
});

describe('CreatePostForm', () => {
    it('renders correctly', () => {
        render(
            <Provider store={createTestStore()}>
                <CreatePostForm />
            </Provider>,
        );
        expect(
            screen.getByTestId('createpostform-author-input'),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('createpostform-body-input'),
        ).toBeInTheDocument();
    });

    it('handles input correctly', () => {
        render(
            <Provider store={createTestStore()}>
                <CreatePostForm />
            </Provider>,
        );
        fireEvent.change(screen.getByTestId('createpostform-author-input'), {
            target: { value: 'Test Author' },
        });
        fireEvent.change(screen.getByTestId('createpostform-body-input'), {
            target: { value: 'Test Body' },
        });
        expect(screen.getByTestId('createpostform-author-input')).toHaveValue(
            'Test Author',
        );
        expect(screen.getByTestId('createpostform-body-input')).toHaveValue(
            'Test Body',
        );
    });
});

describe('PostList', () => {
    it('renders correctly with posts', () => {
        const testStore = createTestStore({
            posts: {
                posts: [
                    {
                        id: 1,
                        data: {
                            author: 'Test Author',
                            body: 'Test Body',
                            created: Date.now(),
                            edited: Date.now(),
                            postId: 'test-post-1',
                        },
                    },
                ],
                status: 'succeeded',
                error: null,
            },
        });

        render(
            <Provider store={testStore}>
                <PostList />
            </Provider>,
        );

        expect(screen.getByText('Test Author')).toBeInTheDocument();
        expect(screen.getByText('Test Body')).toBeInTheDocument();
    });
});
