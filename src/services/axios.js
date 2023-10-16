import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getAllRecipes = async () => {
  const response = await api.get('/recipes');
  return response.data.recipes;
};

export const addRecipe = async (recipeData) => {
  const response = await api.post('/recipes', recipeData);
  return response.data.recipe;
};

export const deleteRecipe = async (recipeId) => {
  const response = await api.delete(`/recipes/${recipeId}`);
  return response.data.recipe;
};

