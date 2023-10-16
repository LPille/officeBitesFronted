import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getAllRecipes = async () => {
  const response = await api.get('/recipes');
  return response.data.recipes;
};

export const addRecipe = async (recipeData) => {
  const response = await api.post('/recipe', recipeData);
  return response.data.recipe;
};

export const updateRecipe = async (recipeData) => {
  console.log(recipeData);
  const response = await api.put(`/recipe/${recipeData._id}`, recipeData);
  return response.data.recipe;
};

export const deleteRecipe = async (recipeId) => {
  const response = await api.delete(`/recipe/${recipeId}`);
  return response.data.recipe;
};

