import LeaderboardItem from './LeaderboardItem';

export default {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  tags: ['autodocs'],
};

export const GoldMedal = {
  args: {
    leaderboard: {
      user: {
        id: 'users-1',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas+Saputra&background=6366f1&color=fff',
      },
      score: 55,
    },
    rank: 1,
  },
};

export const SilverMedal = {
  args: {
    leaderboard: {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=8b5cf6&color=fff',
      },
      score: 30,
    },
    rank: 2,
  },
};

export const BronzeMedal = {
  args: {
    leaderboard: {
      user: {
        id: 'users-3',
        name: 'Bob Smith',
        avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=f59e0b&color=fff',
      },
      score: 20,
    },
    rank: 3,
  },
};

export const RegularRank = {
  args: {
    leaderboard: {
      user: {
        id: 'users-4',
        name: 'Alice Wonder',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Wonder&background=64748b&color=fff',
      },
      score: 5,
    },
    rank: 7,
  },
};
