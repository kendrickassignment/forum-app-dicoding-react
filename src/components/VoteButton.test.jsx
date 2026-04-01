/**
 * Skenario pengujian VoteButton component
 *
 * - VoteButton component
 *   - should render up vote and down vote count correctly
 *   - should call onUpVote when up vote button is clicked
 *   - should call onDownVote when down vote button is clicked
 *   - should show voted style when user already up voted
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

describe('VoteButton component', () => {
  it('should render up vote and down vote count correctly', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={['users-1', 'users-2']}
        downVotesBy={['users-3']}
        onUpVote={() => {}}
        onDownVote={() => {}}
      />,
    );

    // assert
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('should call onUpVote when up vote button is clicked', async () => {
    // arrange
    const onUpVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        onUpVote={onUpVote}
        onDownVote={() => {}}
      />,
    );
    const upVoteButton = screen.getByLabelText('Up vote');

    // action
    await userEvent.click(upVoteButton);

    // assert
    expect(onUpVote).toHaveBeenCalled();
  });

  it('should call onDownVote when down vote button is clicked', async () => {
    // arrange
    const onDownVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        onUpVote={() => {}}
        onDownVote={onDownVote}
      />,
    );
    const downVoteButton = screen.getByLabelText('Down vote');

    // action
    await userEvent.click(downVoteButton);

    // assert
    expect(onDownVote).toHaveBeenCalled();
  });

  it('should show voted style when user already up voted', () => {
    // arrange
    const { container } = render(
      <VoteButton
        upVotesBy={['users-1']}
        downVotesBy={[]}
        authUserId="users-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />,
    );

    // assert
    const upVoteButton = container.querySelector('.vote-button__up--voted');
    expect(upVoteButton).toBeTruthy();
  });
});
