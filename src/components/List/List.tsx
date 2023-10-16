import { RecipeItem } from './Item'
import { useRecipe} from '../../context'

export const RecipeList = () => {

  const { recipes } = useRecipe()

  if (!recipes.length) {
    return (
      <div className="empty-list">
        <h1>
          You have nothing to do!
        </h1>
      </div>
    )
  }

  return (
    <div className="list">
      <ul className="row recipe-list">
        {recipes.map(recipe => (
          <RecipeItem recipe={recipe} key={recipe._id} />
        ))}
      </ul>
    </div>
  )
}
