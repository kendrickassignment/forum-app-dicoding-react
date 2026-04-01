import ActionType from '../actionType';
import * as api from '../../utils/api';
import { setLoadingActionCreator, unsetLoadingActionCreator } from '../loading/action';

function receiveThreadDetailActionCreator(threadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

function upVoteThreadDetailActionCreator(userId) {
  return { type: ActionType.UP_VOTE_THREAD_DETAIL, payload: { userId } };
}

function downVoteThreadDetailActionCreator(userId) {
  return { type: ActionType.DOWN_VOTE_THREAD_DETAIL, payload: { userId } };
}

function neutralVoteThreadDetailActionCreator(userId) {
  return { type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL, payload: { userId } };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.UP_VOTE_COMMENT, payload: { commentId, userId } };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.DOWN_VOTE_COMMENT, payload: { commentId, userId } };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.NEUTRAL_VOTE_COMMENT, payload: { commentId, userId } };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      console.error('Failed to fetch thread detail:', error.message);
    }
    dispatch(unsetLoadingActionCreator());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
    dispatch(unsetLoadingActionCreator());
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      // eslint-disable-next-line no-alert
      alert('Anda harus login untuk melakukan vote.');
      return;
    }
    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(upVoteThreadDetailActionCreator(authUser.id));
    }

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(threadDetail.id);
      } else {
        await api.upVoteThread(threadDetail.id);
      }
    } catch (error) {
      if (isUpVoted) {
        dispatch(upVoteThreadDetailActionCreator(authUser.id));
      } else {
        dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
      }
      console.error('Vote failed:', error.message);
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      // eslint-disable-next-line no-alert
      alert('Anda harus login untuk melakukan vote.');
      return;
    }
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(downVoteThreadDetailActionCreator(authUser.id));
    }

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(threadDetail.id);
      } else {
        await api.downVoteThread(threadDetail.id);
      }
    } catch (error) {
      if (isDownVoted) {
        dispatch(downVoteThreadDetailActionCreator(authUser.id));
      } else {
        dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
      }
      console.error('Vote failed:', error.message);
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      // eslint-disable-next-line no-alert
      alert('Anda harus login untuk melakukan vote.');
      return;
    }
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    const isUpVoted = comment.upVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } else {
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      if (isUpVoted) {
        await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
      } else {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      if (isUpVoted) {
        dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
      console.error('Vote failed:', error.message);
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      // eslint-disable-next-line no-alert
      alert('Anda harus login untuk melakukan vote.');
      return;
    }
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    const isDownVoted = comment.downVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } else {
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      if (isDownVoted) {
        await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
      } else {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      if (isDownVoted) {
        dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
      console.error('Vote failed:', error.message);
    }
  };
}

export {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
