const mockData = {
  userDetails: {
    firstName: "Lannister",
    lastName: "Tochuckwu",
    username: "Lannyster",
    email: "merdoth@gmail.com",
    password: "123456",
    confirmPassword: "123456"
  },
  signUpResponse: {
    message: "Registration Successful",
    user: {
      id: 6,
      username: "Lannyster"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJMYW5ueXN0ZXIiLCJpYXQiOjE1MTgxNTM5NDgsImV4cCI6MTUxODI0MDM0OH0.xAUpT_pg6XsLKAArIJvCkPID_2r7l46DAsb4MlE4qZ8"
  },
  signUpFailureData: {
    firstName: "Lannister",
    lastName: "Tochuckwu",
    username: "Lannyster"
  },
  signUpFailResponse: {
    message: {
      email: [
        "The email field is required."
      ],
      password: [
        "The password field is required."
      ]
    }
  },
  loginDetails: {
    email: "merdoth@gmail.com",
    password: "123456"
  },
  signInFailureData: {
    firstName: "Lannister",
    lastName: "Tochuckwu",
    username: "Lannyster"
  },
  signInFailResponse: {
    message: {
      password: [
        "The password field is required."
      ]
    }
  },
  signinResponse: {
    message: "Log in successful",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJMYW5ueXN0ZXIiLCJpYXQiOjE1MTgxNTU5ODR9.FaephaUz6HDBWT4GzKjLGZW9JZprobC4mSWWR23KF8M",
    user: {
      id: 6,
      username: "Lannyster"
    }
  },
  getUserResponse: {
    user: {
      id: 6,
      firstName: "Lannister",
      lastName: "Tochuckwu",
      username: "Lannyster",
      email: "merdoth@gmail.com",
      password: "$2a$10$VOuhn1orNDTM/zn51LKR8.j2jovuF.Z41l5zXu21wr1TsYXrTYOXm",
      createdAt: "2018-02-09T05:25:48.083Z",
      updatedAt: "2018-02-09T05:25:48.083Z"
    }
  },

  updateRecipeResponse: {
    message: 'Recipe successfully updated',
    recipe: {
      id: 4,
      name: 'Ayama',
      ingredient: 'salt and water',
      description: 'Peprereerer',
      userId: 1,
      imageUrl: '',
      views: 12,
      upvotes: 1,
      downvotes: 1,
      createdAt: '2018-02-03T07:08:22.123Z',
      updatedAt: '2018-02-14T18:58:32.114Z',
    }
  },
  userRecipeResponse: {
    message: "This are your recipes",
    paginationMeta: {
      pageCount: 3,
      totalCount: 11,
      outputCount: 4,
      pageSize: 4,
      currentPage: 1
    },
    recipes: [
      {
        id: 1,
        name: "Sample Recipe",
        ingredient: "sample, sample, sample",
        description: "This is how to cook a sample recipe",
        userId: 1,
        imageUrl: "",
        views: 34,
        upvotes: 2,
        downvotes: 0,
        createdAt: "2018-01-31T12:39:02.873Z",
        updatedAt: "2018-02-08T08:57:07.632Z",
        User: {
          username: "joshday"
        }
      },
      {
        id: 4,
        name: "Chicken Nuggets",
        ingredient: "chicken, water, pepper, salt, yam, sugar",
        description: "This is how to cook chicken nuggets",
        userId: 1,
        imageUrl: "",
        views: 7,
        upvotes: 1,
        downvotes: 1,
        createdAt: "2018-02-03T07:08:22.123Z",
        updatedAt: "2018-02-08T11:28:02.399Z",
        User: {
          username: "joshday"
        }
      },
      {
        id: 5,
        name: "Rice and beans",
        ingredient: "Rice, beans, water",
        description: "This is how to cook rice and beans",
        userId: 1,
        imageUrl: "",
        views: 2,
        upvotes: 0,
        downvotes: 0,
        createdAt: "2018-02-03T07:10:03.615Z",
        updatedAt: "2018-02-06T22:09:00.211Z",
        User: {
          username: "joshday"
        }
      },
      {
        id: 6,
        name: "Pizza",
        ingredient: "sdf,asdf,df,asdf,asdf,dfd",
        description: "dfdfadsf",
        userId: 1,
        imageUrl: "",
        views: 1,
        upvotes: 1,
        downvotes: 1,
        createdAt: "2018-02-03T07:16:24.952Z",
        updatedAt: "2018-02-06T22:32:11.617Z",
        User: {
          username: "joshday"
        }
      }
    ]
  },
  viewRecipeResponse: {
    recipe: {
      id: 1,
      name: "Sample Recipe",
      ingredient: "sample, sample, sample\n",
      description: "This is how to cook a sample recipe",
      userId: 1,
      imageUrl: "",
      views: 1,
      upvotes: 2,
      downvotes: 0,
      createdAt: "2018-01-31T12:39:02.873Z",
      updatedAt: "2018-02-10T08:19:23.282Z",
      votings: [
        {
          id: 114,
          voting: 1,
          userId: 1,
          recipeId: 1,
          createdAt: "2018-02-02T21:43:28.811Z",
          updatedAt: "2018-02-02T21:43:28.811Z"
        }
      ],
      favorites: [],
      User: {
        username: "joshday"
      }
    }
  },
  deleteRecipeResponse: {
    message: "Recipe successfully deleted"
  },
  postReviewResponse: {
    message: "Review Posted",
    recipe: {
      id: 6,
      content: "Awesome!!!",
      recipeId: 4,
      userId: 1,
      updatedAt: "2018-02-10T10:14:04.665Z",
      createdAt: "2018-02-10T10:14:04.665Z"
    }
  },
  getReviewResponse: {
    id: 5,
    content: "sweeeeet!!!!",
    createdAt: "2018-02-08T11:19:12.359Z",
    updatedAt: "2018-02-08T11:19:12.359Z",
    recipeId: 4,
    userId: 1,
    users: {
      username: "joshday"
    }
  },
  allRecipeResponse: {
    paginationMeta: {
      pageCount: 3,
      totalCount: 10,
      outputCount: 4,
      pageSize: 4,
      currentPage: 1
    },
    recipes: [
      {
        id: 4,
        name: "Chicken Nuggets",
        ingredient: "chicken, water, pepper, salt, yam, sugar",
        description: "This is how to cook chicken nuggets",
        userId: 1,
        imageUrl: "",
        views: 7,
        upvotes: 1,
        downvotes: 1,
        createdAt: "2018-02-03T07:08:22.123Z",
        updatedAt: "2018-02-08T11:28:02.399Z",
        User: {
          username: "joshday"
        }
      },
      {
        id: 5,
        name: "Rice and beans",
        ingredient: "Rice, beans, water",
        description: "This is how to cook rice and beans",
        userId: 1,
        imageUrl: "",
        views: 13,
        upvotes: 0,
        downvotes: 0,
        createdAt: "2018-02-03T07:10:03.615Z",
        updatedAt: "2018-02-10T12:51:48.550Z",
        User: {
          username: "joshday"
        }
      },
      {
        id: 6,
        name: "Pizza",
        ingredient: "sdf,asdf,df,asdf,asdf,dfd",
        description: "dfdfadsf",
        userId: 1,
        imageUrl: "",
        views: 1,
        upvotes: 1,
        downvotes: 1,
        createdAt: "2018-02-03T07:16:24.952Z",
        updatedAt: "2018-02-06T22:32:11.617Z",
        User: {
          username: "joshday"
        }
      },
      {
        id: 13,
        name: "Fishyam",
        ingredient: "yam, fish, oil",
        description: "This is how to cook ",
        userId: 1,
        imageUrl: "",
        views: 0,
        upvotes: 0,
        downvotes: 0,
        createdAt: "2018-02-05T12:02:03.321Z",
        updatedAt: "2018-02-05T12:02:03.321Z",
        User: {
          username: "joshday"
        }
      }
    ]
  },
  favoriteResponse: {
    message: "Recipe successfully made your favorite",
    favorite: {
      id: 7,
      recipeId: 4,
      userId: 1,
      updatedAt: "2018-02-10T14:22:53.903Z",
      createdAt: "2018-02-10T14:22:53.903Z"
    }
  },
  userFavorites: {
    paginationMeta: {
      pageCount: 1,
      totalCount: 3,
      outputCount: 3,
      pageSize: 4,
      currentPage: 1
    },
    recipes: [
      {
        id: 5,
        recipeId: 6,
        userId: 1,
        createdAt: "2018-02-03T21:00:29.741Z",
        updatedAt: "2018-02-03T21:00:29.741Z",
        Recipe: {
          id: 6,
          name: "Pizza",
          ingredient: "sdf,asdf,df,asdf,asdf,dfd",
          description: "dfdfadsf",
          userId: 1,
          imageUrl: "",
          views: 1,
          upvotes: 1,
          downvotes: 1,
          createdAt: "2018-02-03T07:16:24.952Z",
          updatedAt: "2018-02-06T22:32:11.617Z",
          User: {
            username: "joshday"
          }
        }
      },
      {
        id: 7,
        recipeId: 4,
        userId: 1,
        createdAt: "2018-02-10T14:22:53.903Z",
        updatedAt: "2018-02-10T14:22:53.903Z",
        Recipe: {
          id: 4,
          name: "Chicken Nuggets",
          ingredient: "chicken, water, pepper, salt, yam, sugar",
          description: "This is how to cook chicken nuggets",
          userId: 1,
          imageUrl: "",
          views: 10,
          upvotes: 1,
          downvotes: 1,
          createdAt: "2018-02-03T07:08:22.123Z",
          updatedAt: "2018-02-10T15:06:35.141Z",
          User: {
            username: "joshday"
          }
        }
      },
      {
        id: 8,
        recipeId: 4,
        userId: 1,
        createdAt: "2018-02-10T14:26:35.850Z",
        updatedAt: "2018-02-10T14:26:35.850Z",
        Recipe: {
          id: 4,
          name: "Chicken Nuggets",
          ingredient: "chicken, water, pepper, salt, yam, sugar",
          description: "This is how to cook chicken nuggets",
          userId: 1,
          imageUrl: "",
          views: 10,
          upvotes: 1,
          downvotes: 1,
          createdAt: "2018-02-03T07:08:22.123Z",
          updatedAt: "2018-02-10T15:06:35.141Z",
          User: {
            username: "joshday"
          }
        }
      }
    ]
  },
  upvoteResponse: {
    message: "Vote status recorded",
    recipe: {
      id: 4,
      name: "Chicken Nuggets",
      ingredient: "chicken, water, pepper, salt, yam, sugar",
      description: "This is how to cook chicken nuggets",
      userId: 1,
      imageUrl: "",
      views: 11,
      upvotes: 2,
      downvotes: 0,
      createdAt: "2018-02-03T07:08:22.123Z",
      updatedAt: "2018-02-10T17:37:13.598Z"
    }
  },
  downvoteResponse: {
    message: "Downvote Successful",
    recipe: {
      id: 4,
      name: "Chicken Nuggets",
      ingredient: "chicken, water, pepper, salt, yam, sugar",
      description: "This is how to cook chicken nuggets",
      userId: 1,
      imageUrl: "",
      views: 11,
      upvotes: 1,
      downvotes: 1,
      createdAt: "2018-02-03T07:08:22.123Z",
      updatedAt: "2018-02-10T20:29:55.381Z"
    }
  },
  allFavoritesResponse: {
    paginationMeta: {
      pageCount: 1,
      totalCount: 3,
      outputCount: 3,
      pageSize: 4,
      currentPage: 1
    },
    recipes: [
      {
        id: 1,
        recipeId: 2,
        userId: 1,
        createdAt: "2018-02-16T17:09:36.370Z",
        updatedAt: "2018-02-16T17:09:36.370Z",
        Recipe: {
          id: 2,
          name: "Meat Pie",
          ingredient: "Meat, water, pepper, flour, seasoning",
          description: "This is how to meat Pie",
          userId: 1,
          imageUrl: "",
          views: 2,
          upvotes: 0,
          downvotes: 0,
          createdAt: "2018-02-16T17:06:32.521Z",
          updatedAt: "2018-02-16T17:09:31.161Z",
          User: {
            username: "jaytee"
          }
        }
      },
      {
        id: 2,
        recipeId: 3,
        userId: 1,
        createdAt: "2018-02-16T17:09:55.407Z",
        updatedAt: "2018-02-16T17:09:55.407Z",
        Recipe: {
          id: 3,
          name: "Chicken Pie",
          ingredient: "Meat, water, pepper, flour, seasoning",
          description: "This is how to chicken Pie",
          userId: 1,
          imageUrl: "",
          views: 2,
          upvotes: 0,
          downvotes: 0,
          createdAt: "2018-02-16T17:06:39.145Z",
          updatedAt: "2018-02-16T17:09:54.279Z",
          User: {
            username: "jaytee"
          }
        }
      },
      {
        id: 3,
        recipeId: 1,
        userId: 2,
        createdAt: "2018-02-16T17:25:16.044Z",
        updatedAt: "2018-02-16T17:25:16.044Z",
        Recipe: {
          id: 1,
          name: "Fish Pie",
          ingredient: "Yam, water, pepper, seasoning",
          description: "This is how to cook yam and sauce",
          userId: 1,
          imageUrl: "",
          views: 3,
          upvotes: 0,
          downvotes: 1,
          createdAt: "2018-02-16T17:06:25.915Z",
          updatedAt: "2018-02-16T17:07:06.352Z",
          User: {
            username: "jaytee"
          }
        }
      }
    ]
  },
  searchResponse: {
    paginationMeta: {
      pageCount: 1,
      totalCount: 1,
      outputCount: 1,
      pageSize: 4,
      currentPage: 1
    },
    recipeFound: [
      {
        id: 4,
        name: "Chicken Nuggets",
        ingredient: "chicken, water, pepper, salt, yam, sugar",
        description: "This is how to cook chicken nuggets",
        userId: 1,
        imageUrl: "",
        views: 11,
        upvotes: 1,
        downvotes: 1,
        createdAt: "2018-02-03T07:08:22.123Z",
        updatedAt: "2018-02-10T20:29:55.381Z",
        User: {
          username: "joshday"
        }
      }
    ]
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb3NoZGF5IiwiaWF0IjoxNTE3NjQ3NjY0fQ.nZn90aUwkTkzbUN3CakBNeNanZAjNVDGKGZtH43TefI'
};

export default mockData;