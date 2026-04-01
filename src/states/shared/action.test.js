/**
 * Skenario pengujian asyncPopulateUsersAndThreads thunk
 *
 * - asyncPopulateUsersAndThreads thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly and call console.error when data fetching failed
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { asyncPopulateUsersAndThreads } from './action';
import ActionType from '../actionType';

// Mock the api module
vi.mock('../../utils/api', () => ({
  getAllUsers: vi.fn(),
  getAllThreads: vi.fn(),
}));

// Import after mock
const api = await import('../../utils/api');

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'general',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsers = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeError = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllUsers.mockResolvedValue(fakeUsers);
    api.getAllThreads.mockResolvedValue(fakeThreads);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.SET_LOADING });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.RECEIVE_USERS,
      payload: { users: fakeUsers },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: fakeThreads },
    });
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.UNSET_LOADING });
  });

  it('should dispatch action correctly and call console.error when data fetching failed', async () => {
    // arrange
    api.getAllUsers.mockRejectedValue(fakeError);
    api.getAllThreads.mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.SET_LOADING });
    expect(consoleSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.UNSET_LOADING });

    consoleSpy.mockRestore();
  });
});
