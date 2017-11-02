import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  fails: null,
};
const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESSFUL:
      state = {
        ...state,
        success: !!window.sessionStorage.token,
        fails: null
      };
      break;
    case actionTypes.SIGNIN_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};
export default signinReducer;
