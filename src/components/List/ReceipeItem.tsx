import { useEffect, useRef, useState } from 'react'
import { useReceipe} from '../../context'
import type { Receipe } from '../../context'
import { Input } from './Input'
import { toast } from 'react-hot-toast'


export const ReceipeItem = (props: { receipe: Receipe }) => {
  
  const { receipe } = props

  const [editingReceipeText, setEditingReceipeText] = useState<string>('')
  const [editingReceipeId, setEditingReceipeId] = useState<string | null>(null)

  const { deleteReceipe, editReceipe, updateReceipeStatus } = useReceipe()

  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingReceipeId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingReceipeId])

  const handleEdit = (receipeId: string, receipeText: string) => {
    setEditingReceipeId(receipeId)
    setEditingReceipeText(receipeText)

    if (editInputRef.current) {
      editInputRef.current.focus()
    }
  }

  const handleUpdate = (receipeId: string) => {
    if (editingReceipeText.trim() !== '') {
      editReceipe(receipeId, editingReceipeText)
      setEditingReceipeId(null)
      setEditingReceipeText('')
      toast.success('receipe updated successfully!')
    } else {
      toast.error('Receipe field cannot be empty!')
    }
  }

  const handleDelete = (receipeId: string) => {
    deleteReceipe(receipeId)
    toast.success('Receipe deleted successfully!')
  }

  const handleStatusUpdate = (receipeId: string) => {
    updateReceipeStatus(receipeId)
    toast.success('Receipe status updated successfully!')
  }

  return (
    <>
    <div>{receipe.text}</div>
      {editingReceipeId === receipe.id ? (
        <>
          <Input
            ref={editInputRef}
            type="text"
            value={editingReceipeText}
            onChange={e => setEditingReceipeText(e.target.value)}
          />
          <button className="" onClick={() => handleUpdate(receipe.id)}>
            Update
          </button>
          </>
      ) : (
        <div className="">
          <div className="">
            <button onClick={() => handleStatusUpdate(receipe.id)}>
              {receipe.status === 'undone' ? (
                <span className="">
                  Mark Completed
                </span>
              ) : (
                <span className="">
                  Mark Undone
                </span>
              )}
            </button>
            <div className="">
              <button
                onClick={() => handleEdit(receipe.id, receipe.text)}
                className=""
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(receipe.id)}
                className=""
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
