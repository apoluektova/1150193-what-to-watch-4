import {extend} from "../../utils";
import {createAuthorizationInfo} from "../../adapter/authInfo";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
  UNKNOWN: `UNKNOWN`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  authorizationInfo: {
    id: 0,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  isSignInError: false,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  GET_AUTHORIZATION_INFO: `GET_AUTHORIZATION_INFO`,
  GET_SIGN_IN_ERROR: `GET_SIGN_IN_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
    };
  },
  getAuthorizationInfo: (authInfo) => {
    return {
      type: ActionType.GET_AUTHORIZATION_INFO,
      payload: authInfo,
    };
  },
  getSignInError: () => {
    return {
      type: ActionType.GET_SIGN_IN_ERROR,
      payload: true,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.GET_AUTHORIZATION_INFO:
      return extend(state, {
        authorizationInfo: action.payload,
      });
    case ActionType.GET_SIGN_IN_ERROR:
      return extend(state, {
        isSignInError: action.payload,
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
    .catch(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.getAuthorizationInfo(createAuthorizationInfo(response.data)));
    })
    .catch(() => {
      dispatch(ActionCreator.getSignInError());
    });
  }
};

export {AuthorizationStatus, ActionType, ActionCreator, Operation, reducer, initialState};
