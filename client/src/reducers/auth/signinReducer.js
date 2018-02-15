import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  fails: null,
  logout: false
};
const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESSFUL:
      state = {
        ...state,
        success: true,
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
    case actionTypes.LOG_OUT_SUCCESS:
      state = {
        ...state,
        success: false
      };
      break;
    default:
      return state;
  }
  return state;
};
export default signinReducer;
