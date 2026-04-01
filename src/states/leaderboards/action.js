import ActionType from '../actionType';
import * as api from '../../utils/api';
import { setLoadingActionCreator, unsetLoadingActionCreator } from '../loading/action';

function receiveLeaderboardsActionCreator(leaderboards) {
  return { type: ActionType.RECEIVE_LEADERBOARDS, payload: { leaderboards } };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      console.error('Failed to fetch leaderboards:', error.message);
    }
    dispatch(unsetLoadingActionCreator());
  };
}

export { receiveLeaderboardsActionCreator, asyncReceiveLeaderboards };
