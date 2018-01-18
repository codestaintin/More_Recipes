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

const deleteRecipeSuccess = message => ({
  type: actionTypes.DELETE_RECIPE_SUCCESS,
  message
});

const deleteRecipeFailure = error => ({
  type: actionTypes.DELETE_RECIPE_FAILURE,
  error
});

/**
 * Add recipe function
 * 
 * @param {object} recipeDetails - Id of the recipe
 * @param {string} cloudImageUrl - Cloud image URL
 * @returns {object} recipes
 */
const addRecipeAction = (recipeDetails, cloudImageUrl = '') => (dispatch) => {
  const recipeDetail = { recipeDetails, imageUrl: cloudImageUrl };
  axios.post('api/v1/recipes', recipeDetail, {
    headers: { 'x-access-token': window.localStorage.token }
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

/**
 * Clear toaster message function
 * @returns {string} message
 */
const clearToast = () => (dispatch) => {
  dispatch(clearMessage());
};

/**
 * Get user recipes function
 * 
 * @param {userId} userId - Id of the recipe
 * @returns {object} recipes
 */
const getUserRecipes = userId => (
  (dispatch) => {
    axios.get(`/api/v1/users/${userId}/my-recipes`, {
      headers: { 'x-access-token': window.localStorage.token }
    })
      .then((res) => {
        console.table(res.data.recipes);
        dispatch(getUserRecipesSuccess(res.data.recipes));
      })
      .catch(error => dispatch(getUserRecipesFailure(error)));
  }
);

/**
 * Get a recipes function
 * 
 * @param {integer} recipeId - Id of the recipe
 * @returns {object} recipe
 */
const getRecipe = recipeId => (
  dispatch => (
    axios.get(`/api/v1/recipes/${recipeId}`, {
      headers: { 'x-access-token': window.localStorage.token }
    })
      .then((res) => {
        dispatch(viewRecipeSuccess(res.data.recipe));
      })
      .catch(error => dispatch(viewRecipeFailure(error)))
  )
);

/**
 * Edit a recipe function
 * 
 * @param {integer} recipeId - Id of the recipe
 * @param {object} recipeDetails - Details of the recipe
 * @param {string} cloudImageUrl - Clould image URL
 * @returns {object} recipe
 */
const editRecipe = (recipeId, recipeDetails, cloudImageUrl = '') => (dispatch) => {
  const recipe = (cloudImageUrl !== '') ? { ...recipeDetails, imageUrl: cloudImageUrl } : recipeDetails;
  axios.put(`/api/v1/recipes/${recipeId}`, recipe, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(editRecipeSuccess(res.data.message));
      dispatch(isRecipeCreating(false));
    })
    // .catch(error => dispatch(editRecipeFailure(error.res.data.recipe.message)));
    .catch(error => console.log(error.message));
};
/**
 * Delete recipe function
 * 
 * @param {recipeId} recipeId
 * @returns {message} message
 */
const deleteRecipe = recipeId => (dispatch) => {
  axios.delete(`/api/v1/recipes/${recipeId}`, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(deleteRecipeSuccess(res.data.recipe.message));
    })
    .catch(error => dispatch(deleteRecipeFailure(error)));
};

/**
 * Process image upload
 * 
 * @param {recipe} recipe - Recipe
 * @param {object|string} imageFile - Image file
 * @param {type} type - Type of action
 * @param {recipeId} recipeId - Id of the recipe
 * @returns {object} recipe
 */
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
    } else {
      if (type === 'updateRecipe') {
        dispatch(editRecipe(recipeId, recipe));
      } else {
        dispatch(addRecipeAction(recipe));
      }
      dispatch(isRecipeCreating(false));
    }
  }
);
export {
  processRecipeActions,
  editRecipe,
  getRecipe,
  deleteRecipe,
  getUserRecipes,
  clearToast
};
