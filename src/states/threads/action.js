import ActionType from '../actionType';
import * as api from '../../utils/api';
import { setLoadingActionCreator, unsetLoadingActionCreator } from '../loading/action';

function receiveThreadsActionCreator(threads) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function addThreadActionCreator(thread) {
  return { type: ActionType.ADD_THREAD, payload: { thread } };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return { type: ActionType.UP_VOTE_THREAD, payload: { threadId, userId } };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return { type: ActionType.DOWN_VOTE_THREAD, payload: { threadId, userId } };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return { type: ActionType.NEUTRAL_VOTE_THREAD, payload: { threadId, userId } };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
    dispatch(unsetLoadingActionCreator());
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      // eslint-disable-next-line no-alert
      alert('Anda harus login untuk melakukan vote.');
      return;
    }
    const { threads } = getState();
    const thread = threads.find((t) => t.id === threadId);
    const isUpVoted = thread.upVotesBy.includes(authUser.id);

    // Optimistic update
    if (isUpVoted) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      // Rollback
      if (isUpVoted) {
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
      console.error('Vote failed:', error.message);
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      // eslint-disable-next-line no-alert
      alert('Anda harus login untuk melakukan vote.');
      return;
    }
    const { threads } = getState();
    const thread = threads.find((t) => t.id === threadId);
    const isDownVoted = thread.downVotesBy.includes(authUser.id);

    // Optimistic update
    if (isDownVoted) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      // Rollback
      if (isDownVoted) {
        dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
      console.error('Vote failed:', error.message);
    }
  };
}

export {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
