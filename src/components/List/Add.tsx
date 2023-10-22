import React, { FC,useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useRecipe } from '../../context'
import { nanoid } from 'nanoid'
import styles from './List.module.scss';
import cn from 'classnames';

interface AddRecipeProps {
  openModal: () => void;
}


const AddRecipe: FC<AddRecipeProps> = ({openModal}) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const { setEditingRecipe, handleAddRecipe } = useRecipe()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

/*   
    const newRecipe = () => {
    handleAddRecipe();
    //setEditingRecipe({id: nanoid(), name: '', description: '', duration: null, style: null})
    toast.success('Recipe added successfully!', {icon: '👏',  style: {borderRadius: '10px', background: '#333', color: '#fff', },})
  }
 */

  return (
    <div className={'container'}>
      <div className={cn('row', 'justify-content-end')}>
        <div className={cn('col-auto', styles.newCard)} onClick={openModal}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill='#fff'><path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"/></svg>          
          <p className={styles.newName}>New Recipe</p>
        </div>
      </div>
    </div>
   )
}

export default AddRecipe;