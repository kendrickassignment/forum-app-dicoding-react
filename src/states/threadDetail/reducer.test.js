/**
 * Skenario pengujian threadDetailReducer
 *
 * - threadDetailReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
 *   - should return null when given by CLEAR_THREAD_DETAIL action
 *   - should return the thread detail with new comment when given by ADD_COMMENT action
 *   - should return the thread detail with up voted when given by UP_VOTE_THREAD_DETAIL action
 *   - should return the thread detail with down voted when given by DOWN_VOTE_THREAD_DETAIL action
 *   - should return the thread detail with up voted comment when given by UP_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import ActionType from '../actionType';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'general',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-2',
        name: 'Jane Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: fakeThreadDetail },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(fakeThreadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    const initialState = fakeThreadDetail;
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should return the thread detail with new comment when given by ADD_COMMENT action', () => {
    const initialState = fakeThreadDetail;
    const newComment = {
      id: 'comment-2',
      content: 'Ini adalah komentar kedua',
      createdAt: '2021-06-22T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should return the thread detail with up voted when given by UP_VOTE_THREAD_DETAIL action', () => {
    const initialState = fakeThreadDetail;
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toContain('users-1');
    expect(nextState.downVotesBy).not.toContain('users-1');
  });

  it('should return the thread detail with down voted when given by DOWN_VOTE_THREAD_DETAIL action', () => {
    const initialState = { ...fakeThreadDetail, upVotesBy: ['users-1'] };
    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.downVotesBy).toContain('users-1');
    expect(nextState.upVotesBy).not.toContain('users-1');
  });

  it('should return the thread detail with up voted comment when given by UP_VOTE_COMMENT action', () => {
    const initialState = fakeThreadDetail;
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);

    const comment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(comment.upVotesBy).toContain('users-1');
  });
});
