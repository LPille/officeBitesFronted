import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useReceipe } from '../../context'
import { Input } from './Input'

export const AddReceipe = () => {
  const [input, setInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { addReceipe } = useReceipe()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() !== '') {
      addReceipe(input)
      setInput('')
      toast.success('Receipe added successfully!')
    } else {
      toast.error('Receipe field cannot be empty!')
    }
  }

  return (
    <form onSubmit={handleSubmission}>
      <div className="">
        <Input ref={inputRef} type="text" placeholder="start typing ..." value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit" className="" >Submit</button>
      </div>
    </form>
  )
}
