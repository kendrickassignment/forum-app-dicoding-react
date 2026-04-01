/**
 * Skenario pengujian asyncToggleUpVoteThread dan asyncAddThread thunk
 *
 * - asyncToggleUpVoteThread thunk
 *   - should dispatch action correctly when up vote success (not yet voted)
 *   - should dispatch rollback action when up vote failed
 *   - should call alert when user is not logged in
 *
 * - asyncAddThread thunk
 *   - should dispatch action correctly when creating thread success
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { asyncToggleUpVoteThread, asyncAddThread } from './action';
import ActionType from '../actionType';

vi.mock('../../utils/api', () => ({
  upVoteThread: vi.fn(),
  neutralVoteThread: vi.fn(),
  createThread: vi.fn(),
}));

const api = await import('../../utils/api');

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'general',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeAuthUser = {
  id: 'users-1',
  name: 'John Doe',
};

const fakeError = new Error('Ups, something went wrong');

describe('asyncToggleUpVoteThread thunk', () => {
  it('should dispatch action correctly when up vote success (not yet voted)', async () => {
    // arrange
    api.upVoteThread.mockResolvedValue();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threads: [fakeThread],
    });

    // action
    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.UP_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    });
  });

  it('should dispatch rollback action when up vote failed', async () => {
    // arrange
    api.upVoteThread.mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threads: [fakeThread],
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // action
    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    // assert - optimistic update then rollback
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.UP_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    });

    consoleSpy.mockRestore();
  });

  it('should call alert when user is not logged in', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: null,
      threads: [fakeThread],
    });
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // action
    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    // assert
    expect(alertSpy).toHaveBeenCalledWith('Anda harus login untuk melakukan vote.');

    alertSpy.mockRestore();
  });
});

describe('asyncAddThread thunk', () => {
  it('should dispatch action correctly when creating thread success', async () => {
    // arrange
    api.createThread.mockResolvedValue(fakeThread);
    const dispatch = vi.fn();

    // action
    await asyncAddThread({ title: 'Thread Pertama', body: 'Ini adalah thread pertama', category: 'general' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.SET_LOADING });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread },
    });
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.UNSET_LOADING });
  });
});
