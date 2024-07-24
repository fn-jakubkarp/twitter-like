import { describe, it, expect, vi } from 'vitest';

import ErrorBoundary from '@/src/components/ErrorBoundary';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

const ThrowBrokenComponent = () => {
    throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
    it('should render children without error', () => {
        render(
            <ErrorBoundary>
                <div>Test Child</div>
            </ErrorBoundary>,
        );
        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('should render error message when an error is thrown', () => {
        render(
            <ErrorBoundary>
                <ThrowBrokenComponent />
            </ErrorBoundary>,
        );

        expect(
            screen.getByText('Oops! Something went wrong.'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                "We're sorry for the inconvenience. Please try reloading the page.",
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Reload Page/i }),
        ).toBeInTheDocument();
    });

    it('should trigger page reload on button click', () => {
        const reloadMock = vi.fn();

        Object.defineProperty(window, 'location', {
            value: {
                reload: reloadMock,
            },
            writable: true,
        });

        render(
            <ErrorBoundary>
                <ThrowBrokenComponent />
            </ErrorBoundary>,
        );

        const reloadButton = screen.getByTestId('errorboundary-reload-btn');
        fireEvent.click(reloadButton);

        expect(reloadMock).toHaveBeenCalled();
    });
});
