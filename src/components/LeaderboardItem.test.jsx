/**
 * Skenario pengujian LeaderboardItem component
 *
 * - LeaderboardItem component
 *   - should render user name and score correctly
 *   - should render medal for top 3 rank
 *   - should render number for rank above 3
 *   - should render user avatar correctly
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeaderboardItem from './LeaderboardItem';

const fakeLeaderboard = {
  user: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  score: 55,
};

describe('LeaderboardItem component', () => {
  it('should render user name and score correctly', () => {
    // arrange
    render(<LeaderboardItem leaderboard={fakeLeaderboard} rank={1} />);

    // assert
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('55')).toBeTruthy();
  });

  it('should render medal for top 3 rank', () => {
    // arrange
    render(<LeaderboardItem leaderboard={fakeLeaderboard} rank={1} />);

    // assert
    expect(screen.getByText('🥇')).toBeTruthy();
  });

  it('should render number for rank above 3', () => {
    // arrange
    render(<LeaderboardItem leaderboard={fakeLeaderboard} rank={4} />);

    // assert
    expect(screen.getByText('4')).toBeTruthy();
  });

  it('should render user avatar correctly', () => {
    // arrange
    render(<LeaderboardItem leaderboard={fakeLeaderboard} rank={1} />);

    // assert
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeTruthy();
    expect(avatar.src).toContain('generated-image-url.jpg');
  });
});
