import ActionType from '../actionType';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.includes(action.payload.userId)
            ? thread.upVotesBy
            : [...thread.upVotesBy, action.payload.userId],
          downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      });
    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          downVotesBy: thread.downVotesBy.includes(action.payload.userId)
            ? thread.downVotesBy
            : [...thread.downVotesBy, action.payload.userId],
          upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
        };
      });
    case ActionType.NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      });
    default:
      return threads;
  }
}

export default threadsReducer;
