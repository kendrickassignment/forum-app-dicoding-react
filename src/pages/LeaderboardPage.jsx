import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard-page">
      <h2>Klasemen Pengguna Aktif</h2>
      <div className="leaderboard-page__header">
        <span>Pengguna</span>
        <span>Skor</span>
      </div>
      <div className="leaderboard-page__list">
        {leaderboards.map((item, index) => (
          <LeaderboardItem key={item.user.id} leaderboard={item} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
