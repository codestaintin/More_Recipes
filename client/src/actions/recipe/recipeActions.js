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

const addRecipeRequest = (recipe, imageFile, callback) => (
  (dispatch) => {
    dispatch(isRecipeCreating(true));
    let cloudImageUrl = 'http://res.cloudinary.com/ditm0nduo/image/upload/v1514910897/foodie_i9ruos.png';
    if (imageFile.name) {
      const imageData = new FormData();
      imageData.append('file', imageFile);
      imageData.append('upload_preset', 'h5ih1kz8');

      axios.post('https://api.cloudinary.com/v1_1/ditm0nduo/image/upload', imageData)
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

export default addRecipeRequest;
