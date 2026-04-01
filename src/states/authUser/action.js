import ActionType from '../actionType';
import * as api from '../../utils/api';
import { setLoadingActionCreator, unsetLoadingActionCreator } from '../loading/action';

function setAuthUserActionCreator(authUser) {
  return { type: ActionType.SET_AUTH_USER, payload: { authUser } };
}

function unsetAuthUserActionCreator() {
  return { type: ActionType.UNSET_AUTH_USER };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
    dispatch(unsetLoadingActionCreator());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator());
    try {
      await api.register({ name, email, password });
      return true;
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
      return false;
    } finally {
      dispatch(unsetLoadingActionCreator());
    }
  };
}

export {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
