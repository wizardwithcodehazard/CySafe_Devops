import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatBox from './StatBox';
import { User } from 'lucide-react'; // Using a real icon for this test

describe('StatBox Component', () => {
    it('displays the correct value and label', () => {
        // 1. Render with specific props
        render(
            <StatBox
                icon={User}
                val="1,250"
                label="Total Users"
                color="text-blue-500"
            />
        );

        // 2. Assert: Does "1,250" appear on screen?
        expect(screen.getByText('1,250')).toBeInTheDocument();

        // 3. Assert: Does "Total Users" appear?
        expect(screen.getByText('Total Users')).toBeInTheDocument();
    });
});