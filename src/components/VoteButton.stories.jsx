import VoteButton from './VoteButton';

export default {
  title: 'Components/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'up voted' },
    onDownVote: { action: 'down voted' },
  },
};

export const Default = {
  args: {
    upVotesBy: [],
    downVotesBy: [],
    authUserId: null,
  },
};

export const UpVoted = {
  args: {
    upVotesBy: ['users-1', 'users-2', 'users-3'],
    downVotesBy: ['users-4'],
    authUserId: 'users-1',
  },
};

export const DownVoted = {
  args: {
    upVotesBy: ['users-2'],
    downVotesBy: ['users-1', 'users-3'],
    authUserId: 'users-1',
  },
};

export const HighVoteCount = {
  args: {
    upVotesBy: Array.from({ length: 42 }, (_, i) => `users-${i}`),
    downVotesBy: Array.from({ length: 5 }, (_, i) => `users-down-${i}`),
    authUserId: 'users-0',
  },
};
