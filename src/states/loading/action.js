import ActionType from '../actionType';

function setLoadingActionCreator() {
  return { type: ActionType.SET_LOADING };
}

function unsetLoadingActionCreator() {
  return { type: ActionType.UNSET_LOADING };
}

export { setLoadingActionCreator, unsetLoadingActionCreator };
