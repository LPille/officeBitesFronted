import React, { FC, useEffect, useState } from 'react'
import EditableField  from './EditableField'
import { Instruction } from 'src/context/RecipeContext'


interface InstructionProps {
  number: number;
  instruction: Instruction | null;
  updateInstruction: (instruction: Instruction) => void;
}


const EditInstruction: FC<InstructionProps> = ({number, instruction, updateInstruction}) => {

  const [tempInstruction, setTempInstruction] = useState<Instruction | null>(instruction);
  const [initField, setInitField] = useState<string>("");

  useEffect(() => {
    if(tempInstruction) {
      //updateInstruction(tempInstruction)
    }
  }, [tempInstruction])

  const onUpdate = (value: string) => {
    if(tempInstruction) {
      console.log("tempInstruction ", tempInstruction)
      setTempInstruction({...tempInstruction, description: value});
    }
  };


  return (
    <div className='instruction-wrapper'>
      <div className='instruction-number'><p>{number+1}</p></div>
      <EditableField initialValue={tempInstruction?.description} updateField={onUpdate} inputStyle={'instruction'} inputType="Instruction" showInputStyleName={false}/> 
    </div>
  )
}


export default EditInstruction;