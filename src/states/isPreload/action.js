import ActionType from '../actionType';
import * as api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

function setIsPreloadActionCreator(isPreload) {
  return { type: ActionType.SET_IS_PRELOAD, payload: { isPreload } };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // Expected when user is not logged in — do NOT alert
      dispatch(setAuthUserActionCreator(null));
    }
    dispatch(setIsPreloadActionCreator(false));
  };
}

export { setIsPreloadActionCreator, asyncPreloadProcess };
