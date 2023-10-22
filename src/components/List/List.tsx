import { RecipeItem } from './Item'
import { useRecipe} from '../../context'
import styles from './List.module.scss';
import cn from 'classnames';

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
    <div className={styles.list}>
      <ul className={cn('row', styles.recipeList)}>
        {recipes.map(recipe => (
          <RecipeItem recipe={recipe} key={recipe._id} />
        ))}
      </ul>
    </div>
  )
}
