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

    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.EDIT_USER_SUCCESS:
      const newData = action.payload;
      const index = state.users.findIndex((item) => item.id === newData.id);
      // const dataPush = state.users.splice(index, 1, newData);

      state.users[index] = newData;

      return {
        ...state,
        loading: false,
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };

    case types.LOAD_USERS_ERROR:
    case types.CREATE_USER_ERROR:
    case types.EDIT_USER_ERROR:
    case types.DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default usersReducer;
