import { render, screen, waitFor } from '@testing-library/react';
import HistoryList from './HistoryList';

const mockHistory = [
    {
        original_url: 'https://example.com/1',
        short_code: 'abc123',
        short_url: '/abc123',
        created_at: '2025-12-16T12:00:00Z',
    },
    {
        original_url: 'https://example.com/2',
        short_code: 'def456',
        short_url: '/def456',
        created_at: '2025-12-16T13:00:00Z',
    },
];

describe('HistoryList', () => {
    it('renders no recent links message if history is empty', () => {
        render(<HistoryList history={[]} />);
        expect(screen.getByText(/no recent links/i)).toBeInTheDocument();
    });

    it('renders a list of recent links', () => {
        render(<HistoryList history={mockHistory} />);
        // Check short codes and original urls
        expect(screen.getByText('/abc123')).toBeInTheDocument();
        expect(screen.getByText('/def456')).toBeInTheDocument();
        expect(screen.getByText('https://example.com/1')).toBeInTheDocument();
        expect(screen.getByText('https://example.com/2')).toBeInTheDocument();
    });

    it('shows formatted date', async () => {
        render(<HistoryList history={mockHistory} />);
        // Check if the date is displayed (partial match for robustness)
        expect(screen.getAllByText(/2025/).length).toBeGreaterThan(0);
    });
});
