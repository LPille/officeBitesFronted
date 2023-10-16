import { useEffect, useRef, useState } from 'react'
import { useRecipe} from '../../context'
import type { Recipe } from '../../context'
import { toast } from 'react-hot-toast'
import './styles.scss';
import defaultImage from '../../assets/images/pasta.jpg';
import cn from 'classnames'

export const RecipeItem = (props: { recipe: Recipe }) => {
  
  const { recipe } = props
  const [isHoverCard, setIsHoverCard] = useState<Boolean>(false)

/*   const [editingReceipeText, setEditingReceipeText] = useState<string>('')
  const [editingReceipeId, setEditingReceipeId] = useState<string | null>(null)
 */

  const { handleDeleteRecipe, editingRecipe, setEditingRecipe} = useRecipe()

  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingRecipe !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingRecipe])

  const toggleMouseEnterCard = () => {
    setIsHoverCard(true);
  };

  const toggleMouseLeaveCard = () => {
    setIsHoverCard(false);
  };

  const clickEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe)

/*     if (editInputRef.current) {
      editInputRef.current.focus()
    } */
  }

 /*  const handleUpdate = (receipeId: string) => {
    if (editingReceipeText.trim() !== '') {
      editReceipe(receipeId, editingReceipeText)
      setEditingReceipeId(null)
      setEditingReceipeText('')
      toast.success('receipe updated successfully!')
    } else {
      toast.error('Receipe field cannot be empty!')
    }
  }
 */
  const clickDelete = (recipeId: string) => {
    handleDeleteRecipe(recipeId)
    toast.success('Recipe deleted successfully!',   {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }


  return (
    <div className="col-6 col-lg-4 item-wrapper">
      <div className="item"         
        onMouseEnter={() => toggleMouseEnterCard()}
        onMouseLeave={() => toggleMouseLeaveCard()}
        >
        <div className="image">
          <img src={defaultImage} alt="recipe" />
        </div>
        <div className="body-wrapper">
          <div className={cn('actions',{'hover' : isHoverCard})}>
            <div className="action edit" onClick={() => clickEdit(recipe)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='#fff'><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>          
              <p>Edit</p>
            </div>
            <hr/>
            <div className="action delete" onClick={() => clickDelete(recipe._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='#fff'><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
              <p>Delete</p>
            </div>
          </div>

          <div className="body">
            <div className='name'><h1>{recipe.name}</h1></div>
            <div className="description"><p>{recipe.description}</p></div>
          </div>
         </div>
      </div>
    </div>
  )
}
