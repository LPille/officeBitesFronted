import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Recipe, useRecipe } from '../../context'
import EditableField  from './EditableField'
import defaultImage from '../../assets/images/dontknow.jpg';
import { Ingredient, Instruction } from 'src/context/RecipeContext'
import EditIngredient  from './EditIngredient'
import EditInstruction  from './EditInstructions'
import { nanoid } from 'nanoid'


export const EditRecipe = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleDeleteRecipe, handleSaveRecipe, editingRecipe, setEditingRecipe } = useRecipe()
  const [tempRecipe, setTempRecipe] = useState<Recipe | null>(null);
  const [tempIngredients, setTempIngredients] = useState<Ingredient[]>([]);
  const [tempInstructions, setTempInstructions] = useState<Instruction[]>([]);

  const [initField, setInitField] = useState<string>("");
  const [isNewField, setIsNewField] = useState<boolean>(true);


  useEffect(() => {
    setTempRecipe(editingRecipe)
    if(editingRecipe?.ingredients) {
      setTempIngredients(editingRecipe?.ingredients)
    }
    if(editingRecipe?.instructions) {
      setTempInstructions(editingRecipe?.instructions)
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingRecipe])

  const handleSaveEdit = (recipe: Recipe) => {
    if(editingRecipe?._id === recipe._id) {
      handleSaveRecipe(tempRecipe)
      setEditingRecipe(null)
    }
  }

  useEffect(() => {
    if(tempRecipe) {
      setTempRecipe({...tempRecipe, ingredients: tempIngredients})
    }
  }, [tempIngredients])



  const updateName = (value: string) => {
    if(tempRecipe) {
      setTempRecipe({...tempRecipe, name: value})
    }
  }

  const updateDescription = (value: string) => {
    if(tempRecipe) {
      setTempRecipe({...tempRecipe, description: value})
    }
  }

  const updateIngredient = (ingredient: Ingredient) => {
    if (!ingredient.name || ingredient.name.trim() === "") {
      setTempIngredients(tempIngredients.filter(item => item.id !== ingredient.id));
    } else {
      setTempIngredients([...tempIngredients, ingredient]);
    }
  };

  const updateInstruction = (instruction: Instruction) => {
    if (!instruction.description || instruction.description.trim() === "") {
      setTempInstructions(tempInstructions.filter(item => item.id !== instruction.id));
    } else {
      setTempInstructions([...tempInstructions, instruction]);
    }
  };


  const handleDelete = (recipeId: string) => {
    handleDeleteRecipe(recipeId)
    setEditingRecipe(null)
    toast.success('Recipe deleted successfully!',   {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  const handleSetIsAddField = (value: boolean) => {
    setIsNewField(value)
  }

  const onAddNewIngredeint = (value: string) => {
    if(value.trim() !== ''){
      updateIngredient({id: nanoid(), name: value})
      setInitField("")
      setIsNewField(true)
    }
  };

  const onAddNewInstruction = (value: string) => {
    if(value.trim() !== ''){
      const num = tempInstructions.length+1;
      updateInstruction({id: nanoid(), number: num, description: value})
      setInitField("")
      setIsNewField(true)
    }
  };

  return (
    <div className="container edit-wrapper">
      { tempRecipe && (
        <div className="row">
          <div className="col-12">
            <div className="actions">
              <div onClick={() => handleDelete(tempRecipe._id)} className="action delete">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                <p>Delete</p>
              </div>
              <div onClick={() => handleSaveEdit(tempRecipe)} className="action edit">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
                <p>Save</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 recipe">
            <EditableField initialValue={tempRecipe.name} updateField={updateName} inputStyle={'name'} inputType="Name" placeholder={'Name'}/>
            <EditableField initialValue={tempRecipe.description} updateField={updateDescription} inputStyle={'description'} inputType="Description" placeholder={'Description'}/> 

            <div className='ingredients'>
              <h3>Ingredients</h3>
              <div className='row'>
                { tempIngredients && tempIngredients.map((ingredient, index) => (
                  <EditIngredient ingredient={ingredient} updateIngredient={updateIngredient}></EditIngredient>
                ))}
              </div>
            </div>
            <div className='add-ingredient'>
              <EditableField 
                initialValue={initField} 
                updateField={onAddNewIngredeint} 
                inputStyle={'ingredient'} 
                inputType="Ingredient" 
                isAddField={isNewField} 
                setIsAddNewField={handleSetIsAddField} 
                showInputStyleName={false} 
                placeholder={'+ Add Ingredient'}/> 
            </div>
            <div className='instructions'>
              <h3>Instructions</h3>
              { tempInstructions && tempInstructions.map((instruction, index) => (
                <EditInstruction 
                  number={index} 
                  instruction={instruction} 
                  updateInstruction={updateInstruction}/>
              ))}
            </div>
            <div className='add-instruction'>
              <EditableField 
                  initialValue={initField} 
                  updateField={onAddNewInstruction} 
                  inputStyle={'instruction'} 
                  inputType="Instruction" 
                  isAddField={isNewField} 
                  setIsAddNewField={handleSetIsAddField} 
                  showInputStyleName={false} 
                  placeholder={'+ Add Instruction'}/> 
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className='image-wrapper'>
              <img src={defaultImage} alt="recipe" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
