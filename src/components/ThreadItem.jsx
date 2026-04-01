import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FiMessageCircle } from 'react-icons/fi';
import postedAt from '../utils/timeHelper';
import VoteButton from './VoteButton';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../states/threads/action';

function ThreadItem({ thread, user = null }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const onUpVote = (e) => {
    e.preventDefault();
    dispatch(asyncToggleUpVoteThread(thread.id));
  };

  const onDownVote = (e) => {
    e.preventDefault();
    dispatch(asyncToggleDownVoteThread(thread.id));
  };

  return (
    <article className="thread-item">
      <div className="thread-item__header">
        {thread.category && (
          <span className="thread-item__category">
            #
            {thread.category}
          </span>
        )}
        <Link to={`/threads/${thread.id}`} className="thread-item__title">
          <h3>{thread.title}</h3>
        </Link>
      </div>
      <div
        className="thread-item__body"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />
      <div className="thread-item__footer">
        <VoteButton
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          authUserId={authUser?.id}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
        <div className="thread-item__comments">
          <FiMessageCircle />
          <span>{thread.totalComments}</span>
        </div>
        <span className="thread-item__time">{postedAt(thread.createdAt)}</span>
        <div className="thread-item__owner">
          {user && (
            <>
              <img src={user.avatar} alt={user.name} className="thread-item__avatar" />
              <span className="thread-item__owner-name">
                Dibuat oleh
                {' '}
                <strong>{user.name}</strong>
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default ThreadItem;
