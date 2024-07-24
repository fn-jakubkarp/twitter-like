import { Provider } from 'react-redux';

import App from '@/src/App';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { createTestStore } from './utils/createTestStore';

describe('App Component', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={createTestStore()}>
                <App />
            </Provider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
