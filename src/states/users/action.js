import ActionType from '../actionType';

function receiveUsersActionCreator(users) {
  return { type: ActionType.RECEIVE_USERS, payload: { users } };
}

export { receiveUsersActionCreator };
