import {extend} from "../../utils.js";
import {createAuthorizationInfo} from "../../adapter/authInfo.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationInfo: {
    id: 0,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  isSignedIn: false,
};

const ActionType = {
  REQIURE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  GET_AUTHORIZATION_INFO: `GET_AUTHORIZATION_INFO`,
  SIGN_IN: `SIGN_IN`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQIURE_AUTHORIZATION,
      payload: status,
    };
  },
  getAuthorizationInfo: (authInfo) => {
    return {
      type: ActionType.GET_AUTHORIZATION_INFO,
      payload: authInfo,
    };
  },
  signIn: (bool) => {
    return {
      type: ActionType.SIGN_IN,
      payload: bool,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQIURE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.GET_AUTHORIZATION_INFO:
      return extend(state, {
        authorizationInfo: action.payload,
      });
    case ActionType.SIGN_IN:
      return extend(state, {
        isSignedIn: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
    .then((response) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.getAuthorizationInfo(createAuthorizationInfo(response.data)));
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
    .then((response) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.signIn(false));
      dispatch(ActionCreator.getAuthorizationInfo(createAuthorizationInfo(response.data)));
    });
  }
};

export {AuthorizationStatus, ActionType, ActionCreator, Operation, reducer};
