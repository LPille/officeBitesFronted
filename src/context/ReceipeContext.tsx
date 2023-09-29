import React, { createContext } from 'react'
import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'

interface ReceipeContextProps {
  receipes: Receipe[]
  addReceipe: (text: string) => void
  deleteReceipe: (id: string) => void
  editReceipe: (id: string, text: string) => void
  updateReceipeStatus: (id: string) => void
}

export interface Receipe {
  id: string
  text: string
  status: 'undone' | 'completed'
}

export const ReceipeContext = createContext<ReceipeContextProps | undefined>(
  undefined,
)

export const ReceipeProvider = (props: { children: React.ReactNode }) => {
  const [receipes, setReceipes] = useLocalStorage<Receipe[]>('receipes', [])

  // ::: ADD NEW Receipe :::
  const addReceipe = (text: string) => {
    const newReceipe: Receipe = {
      id: nanoid(),
      text,
      status: 'undone',
    }

    setReceipes([...receipes, newReceipe])
  }

  // ::: DELETE A Receipe :::
  const deleteReceipe = (id: string) => {
    setReceipes(prevReceipes => prevReceipes.filter(receipe => receipe.id !== id))
  }

  // ::: EDIT A Receipe :::
  const editReceipe = (id: string, text: string) => {
    setReceipes(prevReceipes => {
      return prevReceipes.map(receipe => {
        if (receipe.id === id) {
          return { ...receipe, text }
        }
        return receipe
      })
    })
  }

  // ::: UPDATE Receipe STATUS :::
  const updateReceipeStatus = (id: string) => {
    setReceipes(prevReceipes => {
      return prevReceipes.map(receipe => {
        if (receipe.id === id) {
          return {
            ...receipe,
            status: receipe.status === 'undone' ? 'completed' : 'undone',
          }
        }
        return receipe
      })
    })
  }

  const value: ReceipeContextProps = {
    receipes,
    addReceipe,
    deleteReceipe,
    editReceipe,
    updateReceipeStatus,
  }

  return (
    <ReceipeContext.Provider value={value}>{props.children}</ReceipeContext.Provider>
  )
}
