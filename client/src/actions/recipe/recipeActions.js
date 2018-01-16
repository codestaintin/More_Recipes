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

const getUserRecipesSuccess = data => ({
  type: actionTypes.GET_USER_RECIPES_SUCCESS,
  data
});

const getUserRecipesFailure = error => ({
  type: actionTypes.GET_USER_RECIPES_FAILURE,
  error
});

const viewRecipeSuccess = data => ({
  type: actionTypes.VIEW_RECIPE_SUCCESS,
  data
});

const viewRecipeFailure = error => ({
  type: actionTypes.VIEW_RECIPE_FAILURE,
  error
});

const editRecipeSuccess = message => ({
  type: actionTypes.EDIT_RECIPE_SUCCESS,
  message
});

const editRecipeFailure = error => ({
  type: actionTypes.EDIT_RECIPE_FAILURE,
  error
});

const clearMessage = () => ({
  type: actionTypes.CLEAR_RECIPE_MESSAGE
});

const addRecipeAction = (recipeDetails, cloudImageUrl) => (dispatch) => {
  const recipeDetail = { recipeDetails, cloudImageUrl };
  axios.post('api/v1/recipes', recipeDetail, {
    headers: { 'x-access-token': window.sessionStorage.token }
  })
    .then((res) => {
      dispatch(addRecipeSuccess(res.data.message));
      dispatch(isRecipeCreating(false));
    })
    .catch(() => {
      dispatch(addRecipeFailure('An error occurred during this operation, please try again'));
      dispatch(isRecipeCreating(false));
    });
};

const clearToast = () => (dispatch) => {
  dispatch(clearMessage());
};

const getUserRecipes = userId => (
  (dispatch) => {
    axios.get(`/api/v1/users/${userId}/my-recipes`, {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
      .then((res) => {
        console.table(res.data.recipes);
        dispatch(getUserRecipesSuccess(res.data.recipes));
      })
      .catch(error => dispatch(getUserRecipesFailure(error)));
  }
);

const getRecipe = recipeId => (
  dispatch => (
    axios.get(`/api/v1/recipes/${recipeId}`, {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
      .then((res) => {
        dispatch(viewRecipeSuccess(res.data.recipe));
      })
      .catch(error => dispatch(viewRecipeFailure(error)))
  )
);

const editRecipe = (recipeId, recipeDetails, cloudImageUrl) => (dispatch) => {
  const recipe = { ...recipeDetails, imageUrl: cloudImageUrl };
  axios.put(`/api/v1/recipes/${recipeId}`, recipe, {
    headers: { 'x-access-token': window.sessionStorage.token }
  })
    .then((res) => {
      console.log(res.data.message);
      dispatch(editRecipeSuccess(res.data.message));
      dispatch(isRecipeCreating(false));
    })
    // .catch(error => dispatch(editRecipeFailure(error.res.data.recipe.message)));
    .catch(error => console.log(error.message));
};

const processRecipeActions = (recipe, imageFile, type = 'addRecipe', recipeId = '') => (
  (dispatch) => {
    dispatch(isRecipeCreating(true));
    let cloudImageUrl = process.env.DEFAULT_IMAGE;
    if (imageFile.name) {
      const imageData = new FormData();
      imageData.append('file', imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      if (type === 'updateRecipe') {
        axios.post(process.env.CLOUDINARY_URL, imageData)
          .then((response) => {
            cloudImageUrl = response.data.url;
            dispatch(editRecipe(recipeId, recipe, cloudImageUrl));
          }).catch(() => {
            dispatch(editRecipeFailure('Recipe not updated'));
            dispatch(isRecipeCreating(false));
          });
      } else {
        axios.post(process.env.CLOUDINARY_URL, imageData)
          .then((response) => {
            cloudImageUrl = response.data.url;
            dispatch(addRecipeAction(recipe, cloudImageUrl));
          }).catch(() => {
            dispatch(addRecipeFailure('An error occurred while trying to create this recipe'));
            dispatch(isRecipeCreating(false));
          });
      }
    }
  }
);
export {
  processRecipeActions,
  editRecipe,
  getRecipe,
  getUserRecipes,
  clearToast
};
