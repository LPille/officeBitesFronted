import React, { createContext, useState,useEffect } from 'react'
//import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'
import { getAllRecipes, addRecipe, deleteRecipe, updateRecipe } from '../services/axios'; // Update the path


interface RecipeContextProps {
  recipes: Recipe[]
  handleAddRecipe: () => void
  handleDeleteRecipe: (id: string) => void
  handleSaveRecipe: (recipe: Recipe | null) => void
  editRecipe: (id: string, text: string) => void
  editingRecipe: Recipe | null
  setEditingRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>
}

export interface Ingredient {
  id: string
  name: string
}

export interface Instruction{
  id: string
  number: number
  description: string
}

export interface Recipe {
  _id: string
  name: string | null
  description?: string | null
  duration?: number | null
  style?: number | null
  ingredients?: Ingredient[] | null
  instructions?: Instruction[] | null
}

export const RecipeContext = createContext<RecipeContextProps | undefined>(undefined)

export const RecipeProvider = (props: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', [])
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await getAllRecipes();
      console.log("fetchedRecipesl ", fetchedRecipes)
      setRecipes(fetchedRecipes);
    };
    fetchRecipes();
  }, []);


  // ::: ADD NEW Recipe :::
  const handleAddRecipe = async () => {
    const newRecipeData = { 
      name: '',
      description: '',
      duration: 0,
      style: 1,
      ingredients: [],
      instructions: []
    }
    
    const newRecipe = await addRecipe(newRecipeData);
    setEditingRecipe(newRecipe)
    setRecipes([...recipes, newRecipe])

  }

  const handleDeleteRecipe = async (_id: string) => {
    const deletedRecipe = await deleteRecipe(_id);
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== _id))
  }

  const editRecipe = (_id: string, name: string) => {
    setRecipes(prevRecipes => {
      return prevRecipes.map(recipe => {
        if (recipe._id === _id) {
          return { ...recipe, name: name }
        }
        return recipe
      })
    })
  }
  // Save a recipe
  const handleSaveRecipe = async (recipe: Recipe | null) => {
    if (recipe) {
      if(!recipes.some(item => item._id === recipe._id)){
        console.log("new RECIPE")
        setRecipes([...recipes, recipe]);
      } else {
        console.log("Update RECIPE")

        const updatedRecipe = await updateRecipe(recipe);

        setRecipes(prevRecipes => {
          return prevRecipes.map(prevRecipe => {
            if (prevRecipe._id === recipe._id) {
              return recipe
            }
            return prevRecipe
          })
        })
      }
    }
  }

  // ::: UPDATE Receipe STATUS :::
/*   const updateReceipeStatus = (id: string) => {
    setReceipes(prevReceipes => {
      return prevReceipes.map(receipe => {
        if (receipe.id === id) {
          return {
            ...receipe,
            style: receipe.status === 'undone' ? 'completed' : 'undone',
          }
        }
        return receipe
      })
    })
  } */

  const value: RecipeContextProps = {
    recipes: recipes,
    handleAddRecipe: handleAddRecipe,
    handleDeleteRecipe: handleDeleteRecipe,
    handleSaveRecipe: handleSaveRecipe,
    editRecipe: editRecipe,
    editingRecipe: editingRecipe,
    setEditingRecipe: setEditingRecipe,
  }

  return (
    <RecipeContext.Provider value={value}>{props.children}</RecipeContext.Provider>
  )
}
