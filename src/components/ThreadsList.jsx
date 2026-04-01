import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadsList({ threads, users }) {
  return (
    <section className="threads-list">
      {threads.map((thread) => {
        const user = users.find((u) => u.id === thread.ownerId);
        return <ThreadItem key={thread.id} thread={thread} user={user} />;
      })}
      {threads.length === 0 && (
        <p className="threads-list__empty">Tidak ada thread yang ditemukan.</p>
      )}
    </section>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThreadsList;
