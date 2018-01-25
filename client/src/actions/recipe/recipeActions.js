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

const postReviewSuccess = message => ({
  type: actionTypes.POST_REVIEW_SUCCESS,
  message
});

const postReviewFailure = error => ({
  type: actionTypes.POST_REVIEW_FAILURE,
  error
});

const getReviewSuccess = review => ({
  type: actionTypes.GET_REVIEW_SUCCESS,
  review
});

const getReviewFailure = error => ({
  type: actionTypes.GET_REVIEW_FAILURE,
  error
});

const getAllRecipesSuccess = data => ({
  type: actionTypes.GET_ALL_RECIPES_SUCCESS,
  data
});

const getAllRecipesFailure = errors => ({
  type: actionTypes.GET_ALL_RECIPES_FAILURE,
  errors
});

const createUserFavourite = message => ({
  type: actionTypes.CREATE_USER_FAVORITE_SUCCESS,
  message
});

const createUserFavouriteFailure = error => ({
  type: actionTypes.CREATE_USER_FAVORITE_FAILURE,
  error
});

const getUserFavoritesSuccess = data => ({
  type: actionTypes.GET_USER_FAVORITES_SUCCESS,
  data
});

const getUserFavoritesFailure = error => ({
  type: actionTypes.GET_USER_FAVORITES_FAILURE,
  error
});
/**
 * Add recipe function
 * 
 * @param {object} recipeDetails
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
      dispatch(
        addRecipeFailure(
          'An error occurred during this operation, please try again'
        ));
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
 * @param {integer} userId - Id of the recipe
 * @returns {object} recipes
 */
const getUserRecipes = userId => (
  (dispatch) => {
    axios.get(`/api/v1/users/${userId}/my-recipes`, {
      headers: { 'x-access-token': window.localStorage.token }
    })
      .then((res) => {
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
 * Get all recipes function
 * 
 * @returns {object} recipe
 */
const getAllRecipes = () => (
  dispatch => (
    axios.get(`/api/v1/recipes`)
      .then((res) => {
        dispatch(getAllRecipesSuccess({
          allRecipes: res.data.recipes,
          pagination: res.data.paginationMeta
        }));
      })
      .catch(errors => dispatch(getAllRecipesFailure(errors.error)))
  )
);

/**
 * Edit a recipe function
 * 
 * @param {integer} recipeId - Id of the recipe
 * @param {object} recipeDetails - Details of the recipe
 * @param {string} cloudImageUrl - Cloud image URL
 * @returns {object} recipe
 */
const editRecipe = (recipeId, recipeDetails, cloudImageUrl = '') => 
  (dispatch) => {
    const recipe = (cloudImageUrl !== '') ? 
      { ...recipeDetails, imageUrl: cloudImageUrl }
      : recipeDetails;
    axios.put(`/api/v1/recipes/${recipeId}`, recipe, {
      headers: { 'x-access-token': window.localStorage.token }
    })
      .then((res) => {
        dispatch(editRecipeSuccess(res.data.message));
        dispatch(isRecipeCreating(false));
      })
      .catch(error => dispatch(editRecipeFailure(error.res.data.message)));
  };
/**
 * Delete recipe function
 * 
 * @param {integer} recipeId
 * @returns {string} message
 */
const deleteRecipe = recipeId => (dispatch) => {
  axios.delete(`/api/v1/recipes/${recipeId}`, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(deleteRecipeSuccess(res.data.message));
    })
    .catch(error => dispatch(deleteRecipeFailure(error.res.data.message)));
};

/**
 * Post a review function
 * 
 * @param {integer} recipeId
 * @param {string} content
 * @returns {object} reviews
 */
const postReview = (recipeId, content) => (dispatch) => {
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, { content }, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(postReviewSuccess(res.data.message));
    })
    .catch(error => dispatch(postReviewFailure(error)));
};
/**
 * Get a recipe reviews function
 * 
 * @param {integer} recipeId
 * @returns {object} reviews
 */
const getReview = recipeId => (dispatch) => {
  axios.get(`/api/v1/recipes/${recipeId}/reviews`, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(getReviewSuccess(res.data));
      dispatch(viewRecipeSuccess(res.data.recipe));
    })
    .catch(error => dispatch(getReviewFailure(error.res.data.error)));
};
/**
 * 
 *
 * @param {integer} recipeId
 * 
 * @returns {object} favourites
 */
const createFavourite = recipeId => (dispatch) => {
  axios.post(`/api/v1/recipes/${recipeId}/favorite`, { recipeId }, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(createUserFavourite(res.data.message));
    })
    .catch(error => dispatch(createUserFavouriteFailure(error.res.data.error.message)));
};
/**
 * Get all user favorites function
 *
 * @param {integer} userId
 * @returns {object} recipe
 */
const getUserFavorites = userId => (dispatch) => {
  axios.get(`/api/v1/users/${userId}/recipes`, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(getUserFavoritesSuccess({
        userFavorites: res.data.favorites,
        pagination: res.data.paginationMeta
      }));
    })
    .catch(error => dispatch(getUserFavoritesFailure(error.res.data.error)));
};
/**
 * Process image upload
 * 
 * @param {object} recipe - recipe
 * @param {object|string} imageFile - Image file
 * @param {type} type - Type of action
 * @param {integer} recipeId - Id of the recipe
 * @returns {object} recipe
 */
const processRecipeActions =
(recipe, imageFile, type = 'addRecipe', recipeId = '') => (
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
          }).catch((error) => {
            console.dir(error);
            dispatch(editRecipeFailure('Recipe not updated'));
            dispatch(isRecipeCreating(false));
          });
      } else {
        axios.post(process.env.CLOUDINARY_URL, imageData)
          .then((response) => {
            cloudImageUrl = response.data.url;
            dispatch(addRecipeAction(recipe, cloudImageUrl));
          }).catch(() => {
            dispatch(
              addRecipeFailure(
                'You already have this recipe, will you like to edit it'
              ));
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
  getAllRecipes,
  deleteRecipe,
  getUserRecipes,
  createFavourite,
  getUserFavorites,
  postReview,
  getReview,
  clearToast
};
