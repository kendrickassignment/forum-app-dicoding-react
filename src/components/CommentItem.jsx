import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import postedAt from '../utils/timeHelper';
import VoteButton from './VoteButton';
import {
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/action';

function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const onUpVote = () => {
    dispatch(asyncToggleUpVoteComment(comment.id));
  };

  const onDownVote = () => {
    dispatch(asyncToggleDownVoteComment(comment.id));
  };

  return (
    <article className="comment-item">
      <div className="comment-item__header">
        <div className="comment-item__owner">
          <img src={comment.owner.avatar} alt={comment.owner.name} className="comment-item__avatar" />
          <strong className="comment-item__name">{comment.owner.name}</strong>
        </div>
        <span className="comment-item__time">{postedAt(comment.createdAt)}</span>
      </div>
      <div
        className="comment-item__content"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className="comment-item__footer">
        <VoteButton
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          authUserId={authUser?.id}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
    </article>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CommentItem;
