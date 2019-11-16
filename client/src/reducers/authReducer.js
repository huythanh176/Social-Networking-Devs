const GET_CURRENT_USER = "GET_CURRENT_USER";
const TEST_DISPATCH = "TEST_DISPATCH";

export const registerUser = userData => ({
  type: TEST_DISPATCH,
  payload: userData
});

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEST_DISPATCH: {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
};
