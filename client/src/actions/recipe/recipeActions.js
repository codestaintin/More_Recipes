import axios from 'axios';
import FormData from 'form-data';
import actionTypes from '../actionTypes';

const isRecipeCreating = bool => ({
  type: actionTypes.IS_RECIPE_CREATING,
  bool
});

const addRecipeSuccess = message => ({
  type: actionTypes.ADD_RECIPE_SUCCESS,
  message
});

const addRecipeFailure = error => ({
  type: actionTypes.ADD_RECIPE_FAILURE,
  error
});

const addRecipeAction = (recipeDetails, cloudImageUrl, callback) => (dispatch) => {
  const data = { recipeDetails, cloudImageUrl };
  axios.post('api/v1/recipes', data, {
    headers: { 'x-access-token': window.sessionStorage.token }
  })
    .then((res) => {
      dispatch(addRecipeSuccess(res.data.message));
      dispatch(isRecipeCreating(false));
      callback();
    })
    .catch(() => {
      dispatch(addRecipeFailure('An error occurred during this operation, please try again'));
      dispatch(isRecipeCreating(false));
      callback();
    });
};

const recipeActions = (recipe, imageFile, callback) => (
  (dispatch) => {
    dispatch(isRecipeCreating(true));
    let cloudImageUrl = process.env.DEFAULT_IMAGE;
    if (imageFile.name) {
      const imageData = new FormData();
      imageData.append('file', imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      axios.post(process.env.CLOUDINARY_URL, imageData)
        .then((response) => {
          cloudImageUrl = response.data.url;
          dispatch(addRecipeAction(recipe, cloudImageUrl, callback));
        }).catch(() => {
          dispatch(addRecipeFailure('An error occurred during this operation'));
          dispatch(isRecipeCreating(false));
          callback();
        });
    } else {
      dispatch(addRecipeAction(recipe, cloudImageUrl, callback));
    }
  }
);

export default recipeActions;
