import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

// Mock the Lucide icons so they don't break testing (optional but good practice)
vi.mock('lucide-react', () => ({
    Shield: () => <div data-testid="shield-icon" />,
    Search: () => <div />,
    Award: () => <div />,
    Smartphone: () => <div />,
    AlertTriangle: () => <div />,
}));

// Mock the AlertCard since we are testing Dashboard, not its children
vi.mock('../components/AlertCard', () => ({
    default: ({ title }) => <div>{title}</div>,
}));

describe('Dashboard Smoke Test', () => {
    it('renders the dashboard without crashing', () => {
        // 1. Render the component
        render(<Dashboard setActiveTab={() => { }} />);

        // 2. Check for key text that should always be there
        // "System Secure" is inside the Risk Thermometer
        expect(screen.getByText(/System Secure/i)).toBeInTheDocument();

        // "Low Risk" is the main status
        expect(screen.getByText(/Low Risk/i)).toBeInTheDocument();
    });

    it('shows the 3 main action buttons', () => {
        render(<Dashboard setActiveTab={() => { }} />);

        // Check if the buttons exist
        expect(screen.getByText(/Forensic Scan/i)).toBeInTheDocument();
        expect(screen.getByText(/Daily Quiz/i)).toBeInTheDocument();
        expect(screen.getByText(/Scam Dojo/i)).toBeInTheDocument();
    });
});