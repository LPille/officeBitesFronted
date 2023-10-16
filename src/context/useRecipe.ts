import { useContext } from 'react'
import { RecipeContext } from './RecipeContext'

export const useRecipe = () => {
  const context = useContext(RecipeContext)

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider')
  }

  return context
}
