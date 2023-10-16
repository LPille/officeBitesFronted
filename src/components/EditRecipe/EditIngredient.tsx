import React, { FC, useEffect, useState } from 'react'
import EditableField  from './EditableField'
import { Ingredient } from 'src/context/RecipeContext'
import { nanoid } from 'nanoid'


interface IngredientProps {
  ingredient: Ingredient | null;
  updateIngredient: (ingredient: Ingredient) => void;
}


const EditIngredient: FC<IngredientProps> = ({ingredient, updateIngredient}) => {

  const [tempIngredient, setTempIngredient] = useState<Ingredient | null>(ingredient);
  const [initField, setInitField] = useState<string>("");

  const onUpdate = (value: string) => {
    if(tempIngredient) {
      setTempIngredient({...tempIngredient, name: value});
    }
  };

  const onAddNewIngredeint = (value: string) => {
    if(value.trim() !== ''){
      updateIngredient({id: nanoid(), name: value})
      setInitField("")
    }
  };

  return (
    <div className='col-6'>
      <div className='incredient-wrapper'>
        <EditableField initialValue={tempIngredient?.name} updateField={onUpdate} inputStyle={'ingredient'} inputType="Ingredient" placeholder={'Add Ingredient'} showInputStyleName={false}/> 
      </div>
    </div>
  )
}


export default EditIngredient;