import React, { createContext, useState,useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'
import { getAllRecipes, addRecipe, deleteRecipe } from '../services/axios'; // Update the path


interface RecipeContextProps {
  recipes: Recipe[]
  addRecipe: (name: string, description: string| null, duration: number | null, style: number | null) => void
  deleteRecipe: (id: string) => void
  saveRecipe: (recipe: Recipe | null) => void
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
  id: string
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
  const addRecipe = (name: string, description: string | null, duration: number | null, style: number | null) => {
    
    const newRecipe: Recipe = {
      id: nanoid(),
      name: name,
      description,
      duration,
      style,
    }
    setRecipes([...recipes, newRecipe])
  }

  const deleteRecipe = (id: string) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id))
  }

  const editRecipe = (id: string, name: string) => {
    setRecipes(prevRecipes => {
      return prevRecipes.map(recipe => {
        if (recipe.id === id) {
          return { ...recipe, name: name }
        }
        return recipe
      })
    })
  }
  // Save a recipe
  const saveRecipe = (recipe: Recipe | null) => {
    if (recipe) {
      if(!recipes.some(item => item.id === recipe.id)){
        setRecipes([...recipes, recipe]);
      } else {
        setRecipes(prevRecipes => {
          return prevRecipes.map(prevRecipe => {
            if (prevRecipe.id === recipe.id) {
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
    addRecipe: addRecipe,
    deleteRecipe: deleteRecipe,
    editRecipe: editRecipe,
    editingRecipe: editingRecipe,
    setEditingRecipe: setEditingRecipe,
    saveRecipe: saveRecipe
    //updateRecipeStatus,
  }

  return (
    <RecipeContext.Provider value={value}>{props.children}</RecipeContext.Provider>
  )
}
