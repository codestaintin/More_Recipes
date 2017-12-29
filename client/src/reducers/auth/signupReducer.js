import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  errors: null,
  fails: null
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null
      };
      break;
    case actionTypes.SIGNUP_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.SIGNUP_UNSUCCESSFUL:
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
export default signUpReducer;
