import * as types from './actionType';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS_START:
    case types.CREATE_USER_START:
    case types.EDIT_USER_START:
    case types.DELETE_USER_START:
    case types.DETAIL_USER_START:
      return {
        ...state,
        loading: true,
      };

    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case types.LOAD_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
