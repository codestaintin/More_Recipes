import axios from 'axios';
import FormData from 'form-data';
import actionTypes from '../actionTypes';
import { authorization } from '../../utils/helpers';

const baseUrl = `/api/v1`;
const isRecipeCreating = bool => ({
  type: actionTypes.IS_RECIPE_CREATING,
  bool
});

const addRecipeSuccess = (message, recipeId) => ({
  type: actionTypes.ADD_RECIPE_SUCCESS,
  message,
  recipeId
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
  error: error.response.data
});

const viewRecipeSuccess = data => ({
  type: actionTypes.VIEW_RECIPE_SUCCESS,
  data
});

const viewRecipeFailure = error => ({
  type: actionTypes.VIEW_RECIPE_FAILURE,
  error: error.response.data
});

const editRecipeSuccess = message => ({
  type: actionTypes.EDIT_RECIPE_SUCCESS,
  message
});

const editRecipeFailure = error => ({
  type: actionTypes.EDIT_RECIPE_FAILURE,
  error: error.response.data
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
  error: error.response.data
});

const postReviewSuccess = message => ({
  type: actionTypes.POST_REVIEW_SUCCESS,
  message
});

const postReviewFailure = error => ({
  type: actionTypes.POST_REVIEW_FAILURE,
  error: error.response.data
});

const getReviewSuccess = review => ({
  type: actionTypes.GET_REVIEW_SUCCESS,
  review
});

const getReviewFailure = error => ({
  type: actionTypes.GET_REVIEW_FAILURE,
  error: error.response.data
});

const getAllRecipesSuccess = data => ({
  type: actionTypes.GET_ALL_RECIPES_SUCCESS,
  data
});

const getAllRecipesFailure = errors => ({
  type: actionTypes.GET_ALL_RECIPES_FAILURE,
  error: errors.response.data
});

const createUserFavourite = message => ({
  type: actionTypes.CREATE_USER_FAVORITE_SUCCESS,
  message
});

const createUserFavouriteFailure = error => ({
  type: actionTypes.CREATE_USER_FAVORITE_FAILURE,
  error: error.response.data
});

const getUserFavoritesSuccess = data => ({
  type: actionTypes.GET_USER_FAVORITES_SUCCESS,
  data
});

const getUserFavoritesFailure = error => ({
  type: actionTypes.GET_USER_FAVORITES_FAILURE,
  error: error.response.data
});

const upvoteRecipeSuccess = data => ({
  type: actionTypes.CREATE_UPVOTE_SUCCESSFUL,
  data
});
const upvoteRecipeFailure = error => ({
  type: actionTypes.CREATE_UPVOTE_FAILURE,
  error: error.response.data
});

const downvoteRecipeSuccess = data => ({
  type: actionTypes.CREATE_DOWNVOTE_SUCCESSFUL,
  data
});

const downvoteRecipeFailure = error => ({
  type: actionTypes.CREATE_DOWNVOTE_FAILURE,
  error: error.response.data
});

const allFavoritesSuccess = favorites => ({
  type: actionTypes.GET_ALL_FAVORITES_SUCCESS,
  favorites
});

const allFavoritesFailure = error => ({
  type: actionTypes.GET_ALL_FAVORITES_FAILURE,
  error: error.response.data
});

const searchRecipeSuccess = recipes => ({
  type: actionTypes.SEARCH_RECIPE_SUCCESS,
  recipes
});

const searchRecipeFailure = error => ({
  type: actionTypes.SEARCH_RECIPE_FAILURE,
  error: error.response.data
});
/**
 * Add recipe function
 *
 * @param {object} recipeDetails
 * @param {string} cloudImageUrl - Cloud image URL
 * 
 * @returns {object} recipes
 */
const addRecipeAction = (recipeDetails, cloudImageUrl = '') => (dispatch) => {
  const recipeDetail = { recipeDetails, imageUrl: cloudImageUrl };
  return axios.post(`${baseUrl}/recipes`, recipeDetail, authorization())
    .then(({ data: { message, recipe: { id: recipeId } } }) => {
      dispatch(addRecipeSuccess(message, recipeId));
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
 * 
 * @returns {string} message
 */
const clearToast = () => (dispatch) => {
  dispatch(clearMessage());
};

/**
 * Get user recipes function
 *
 * @param {integer} userId - Id of the recipe
 * @param {integer} page - Page number
 *
 * @returns {object} recipes
 */
const getUserRecipes = (userId, page) => (
  dispatch =>
    axios.get(`${baseUrl}/users/${userId}/my-recipes?page=${page}`, authorization())
      .then((res) => {
        dispatch(getUserRecipesSuccess({
          userRecipes: res.data.recipes,
          pagination: res.data.paginationMeta
        }));
      })
      .catch(error => dispatch(getUserRecipesFailure(error)))
);

/**
 * Get a recipes function
 *
 * @param {integer} recipeId - Id of the recipe
 * 
 * @returns {object} recipe
 */
const getRecipe = recipeId => (
  dispatch => (
    axios.get(`${baseUrl}/recipes/${recipeId}`, authorization())
      .then((res) => {
        dispatch(viewRecipeSuccess(res.data.recipe));
      })
      .catch(error => dispatch(viewRecipeFailure(error)))
  )
);

/**
 * Get all recipes function
 *
 * @param {integer} page
 * 
 * @returns {object} recipe
 */
const getAllRecipes = page => (
  dispatch => (
    axios.get(`${baseUrl}/recipes?page=${page}`)
      .then((res) => {
        dispatch(getAllRecipesSuccess({
          allRecipes: res.data.recipes,
          pagination: res.data.paginationMeta
        }));
      })
      .catch(errors => dispatch(getAllRecipesFailure(errors)))
  )
);
/**
 * Edit a recipe function
 *
 * @param {integer} recipeId - Id of the recipe
 * @param {object} recipeDetails - Details of the recipe
 * @param {string} cloudImageUrl - Cloud image URL
 * 
 * @returns {object} recipe
 */
const editRecipe = (recipeId, recipeDetails, cloudImageUrl = '') =>
  (dispatch) => {
    const recipe = (cloudImageUrl !== '') ?
      { ...recipeDetails, imageUrl: cloudImageUrl }
      : recipeDetails;
    return axios.patch(`${baseUrl}/recipes/${recipeId}`, recipe, authorization())
      .then((res) => {
        dispatch(editRecipeSuccess(res.data.message));
        dispatch(isRecipeCreating(false));
      })
      .catch(error => dispatch(editRecipeFailure(error)));
  };
/**
 * Delete recipe function
 *
 * @param {integer} recipeId
 * 
 * @returns {string} message
 */
const deleteRecipe = recipeId => dispatch =>
  axios.delete(`${baseUrl}/recipes/${recipeId}`, authorization())
    .then((res) => {
      dispatch(deleteRecipeSuccess(res.data.message));
    })
    .catch(error => dispatch(deleteRecipeFailure(error)));

/**
 * Post a review function
 *
 * @param {integer} recipeId
 * @param {string} content
 * 
 * @returns {object} reviews
 */
const postReview = (recipeId, content) => dispatch =>
  axios.post(`${baseUrl}/recipes/${recipeId}/reviews`, { content }, authorization())
    .then((res) => {
      dispatch(postReviewSuccess(res.data.message));
    })
    .catch(error => dispatch(postReviewFailure(error)));
/**
 * Get a recipe reviews function
 *
 * @param {integer} recipeId
 * 
 * @returns {object} reviews
 */
const getReview = recipeId => dispatch =>
  axios.get(`${baseUrl}/recipes/${recipeId}/reviews`, authorization())
    .then((res) => {
      dispatch(getReviewSuccess(res.data));
    })
    .catch(error => dispatch(getReviewFailure(error)));
/**
 *
 *
 * @param {integer} recipeId
 *
 * @returns {object} favourites
 */
const createFavourite = recipeId => dispatch =>
  axios.post(`${baseUrl}/recipes/${recipeId}/favorite`, { recipeId }, authorization())
    .then((res) => {
      dispatch(createUserFavourite(res.data.message));
    })
    .catch(error =>
      dispatch(createUserFavouriteFailure(error)));
/**
 * Get all user favorites function
 *
 * @param {integer} userId
 * @param {integer} page
 *
 * @returns {object} recipe
 */
const getUserFavorites = (userId, page) => dispatch =>
  axios.get(`${baseUrl}/users/${userId}/recipes?page=${page}`, authorization())
    .then((res) => {
      dispatch(getUserFavoritesSuccess({
        userFavorites: res.data.recipes,
        pagination: res.data.paginationMeta
      }));
    })
    .catch((error) => {
      dispatch(getUserFavoritesFailure(error));
    });
/**
 * Get all most favorites function
 *
 * @param {integer} page
 *
 * @returns {object} recipes
 */
const getAllFavorites = page => (
  dispatch =>
    axios.get(`${baseUrl}/favorites?page=${page}`, authorization())
      .then((res) => {
        dispatch(allFavoritesSuccess({
          favorites: res.data.recipes,
          pagination: res.data.paginationMeta
        }));
      })
      .catch(error => dispatch(allFavoritesFailure(error)))
);
/**
 * Recipe search function
 *
 * @param {string} searchParams
 * 
 * @returns {object} recipe
 */
const searchRecipe = searchParams => (
  dispatch => (
    axios.get(`${baseUrl}/search?search=${searchParams}`)
      .then((res) => {
        dispatch(searchRecipeSuccess({
          results: res.data.recipeFound,
          pagination: res.data.paginationMeta
        }));
      })
      .catch(error => dispatch(searchRecipeFailure(error)))
  )
);
/**
 * Upvote a recipe
 *
 * @param {integer} recipeId
 * 
 * @returns {object} recipe
 */
const upvoteRecipe = recipeId => dispatch =>
  axios.put(`${baseUrl}/recipe/${recipeId}/upVote`, {}, authorization())
    .then((res) => {
      dispatch(upvoteRecipeSuccess(res.data));
    })
    .catch((error) => {
      dispatch(upvoteRecipeFailure(error));
    });

/**
 * Downvote a recipe
 *
 * @param {integer} recipeId
 * 
 * @returns {object} recipe
 */
const downvoteRecipe = recipeId => dispatch =>
  axios.put(`${baseUrl}/recipe/${recipeId}/downVote`, {}, authorization())
    .then((res) => {
      dispatch(downvoteRecipeSuccess(res.data));
    })
    .catch((error) => {
      dispatch(downvoteRecipeFailure(error));
    });
/**
 * Process image upload
 *
 * @param {object} recipe - recipe
 * @param {object|string} imageFile - Image file
 * @param {string} type - Type of action
 * @param {integer} recipeId - Id of the recipe
 * 
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
  upvoteRecipe,
  downvoteRecipe,
  postReview,
  getReview,
  getAllFavorites,
  searchRecipe,
  clearToast,
  addRecipeAction
};
