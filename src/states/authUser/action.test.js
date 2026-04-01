/**
 * Skenario pengujian asyncSetAuthUser thunk
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly when login success
 *   - should dispatch action and call alert when login failed
 *
 * - asyncRegisterUser thunk
 *   - should return true and dispatch action correctly when register success
 *   - should return false and call alert when register failed
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { asyncSetAuthUser, asyncRegisterUser } from './action';
import ActionType from '../actionType';

vi.mock('../../utils/api', () => ({
  login: vi.fn(),
  getOwnProfile: vi.fn(),
  putAccessToken: vi.fn(),
  register: vi.fn(),
}));

const api = await import('../../utils/api');

const fakeUser = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeToken = 'fake-token-12345';
const fakeError = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  it('should dispatch action correctly when login success', async () => {
    // arrange
    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.SET_LOADING });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    });
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.UNSET_LOADING });
  });

  it('should dispatch action and call alert when login failed', async () => {
    // arrange
    api.login.mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'wrong' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.SET_LOADING });
    expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.UNSET_LOADING });

    alertSpy.mockRestore();
  });
});

describe('asyncRegisterUser thunk', () => {
  it('should return true and dispatch action correctly when register success', async () => {
    // arrange
    api.register.mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    // action
    const result = await asyncRegisterUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    })(dispatch);

    // assert
    expect(result).toBe(true);
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.SET_LOADING });
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.UNSET_LOADING });
  });

  it('should return false and call alert when register failed', async () => {
    // arrange
    api.register.mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // action
    const result = await asyncRegisterUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    })(dispatch);

    // assert
    expect(result).toBe(false);
    expect(alertSpy).toHaveBeenCalledWith(fakeError.message);

    alertSpy.mockRestore();
  });
});
