import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import postedAt from '../utils/timeHelper';
import VoteButton from '../components/VoteButton';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
} from '../states/threadDetail/action';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVote = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const onDownVote = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="thread-detail-page">
      <article className="thread-detail">
        {threadDetail.category && (
          <span className="thread-detail__category">
            #
            {threadDetail.category}
          </span>
        )}
        <h2 className="thread-detail__title">{threadDetail.title}</h2>
        <div className="thread-detail__owner">
          <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className="thread-detail__avatar" />
          <div className="thread-detail__owner-info">
            <strong>{threadDetail.owner.name}</strong>
            <span className="thread-detail__time">{postedAt(threadDetail.createdAt)}</span>
          </div>
        </div>
        <div
          className="thread-detail__body"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
        <div className="thread-detail__actions">
          <VoteButton
            upVotesBy={threadDetail.upVotesBy}
            downVotesBy={threadDetail.downVotesBy}
            authUserId={authUser?.id}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </div>
      </article>

      <section className="thread-detail__comments">
        <h3>
          Komentar (
          {threadDetail.comments.length}
          )
        </h3>
        {authUser ? (
          <CommentInput onAddComment={onAddComment} />
        ) : (
          <p className="thread-detail__login-prompt">
            <Link to="/login">Login</Link>
            {' '}
            untuk memberikan komentar.
          </p>
        )}
        <div className="thread-detail__comments-list">
          {threadDetail.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          {threadDetail.comments.length === 0 && (
            <p className="thread-detail__no-comments">Belum ada komentar.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ThreadDetailPage;
