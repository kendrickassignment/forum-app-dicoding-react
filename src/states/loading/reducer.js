import ActionType from '../actionType';

function loadingReducer(loading = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return true;
    case ActionType.UNSET_LOADING:
      return false;
    default:
      return loading;
  }
}

export default loadingReducer;
