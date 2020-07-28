import {extend} from "../../utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  REQIURE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQIURE_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQIURE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    })
    .catch((error) => {
      throw error;
    });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    });
  }
};

export {AuthorizationStatus, ActionType, ActionCreator, Operation, reducer};
