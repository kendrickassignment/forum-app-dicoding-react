import PropTypes from 'prop-types';

function LeaderboardItem({ leaderboard, rank }) {
  const { user, score } = leaderboard;

  return (
    <div className={`leaderboard-item ${rank <= 3 ? `leaderboard-item--top${rank}` : ''}`}>
      <div className="leaderboard-item__rank">
        {rank <= 3 ? (
          <span className="leaderboard-item__medal">
            {rank === 1 && '🥇'}
            {rank === 2 && '🥈'}
            {rank === 3 && '🥉'}
          </span>
        ) : (
          <span className="leaderboard-item__number">{rank}</span>
        )}
      </div>
      <img src={user.avatar} alt={user.name} className="leaderboard-item__avatar" />
      <div className="leaderboard-item__info">
        <span className="leaderboard-item__name">{user.name}</span>
      </div>
      <span className="leaderboard-item__score">{score}</span>
    </div>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
