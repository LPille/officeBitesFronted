import { ReceipeItem } from './ReceipeItem'
import { useReceipe} from '../../context'

export const ReceipeList = () => {

  const { receipes } = useReceipe()

  if (!receipes.length) {
    return (
      <div className="empty-list">
        <h1>
          You have nothing to do!
        </h1>
      </div>
    )
  }


  return (
    <ul className="receipe-list">
      {receipes.map(receipe => (
        <ReceipeItem receipe={receipe} key={receipe.id} />
      ))}
    </ul>
  )
}
