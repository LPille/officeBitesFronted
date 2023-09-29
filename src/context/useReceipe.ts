import { useContext } from 'react'
import { ReceipeContext } from './ReceipeContext'

export const useReceipe = () => {
  const context = useContext(ReceipeContext)

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider')
  }

  return context
}
