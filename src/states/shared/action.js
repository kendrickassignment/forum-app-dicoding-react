import * as api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { setLoadingActionCreator, unsetLoadingActionCreator } from '../loading/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      // Use console.error instead of alert to prevent blocking loop
      console.error('Failed to fetch threads and users:', error.message);
    }
    dispatch(unsetLoadingActionCreator());
  };
}

export { asyncPopulateUsersAndThreads };
