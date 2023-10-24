import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Recipe, useRecipe } from '../../context'
import defaultImage from '../../assets/images/dontknow.jpg';
import axios from 'axios';

interface Image {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}


export const EditRecipeImage = () => {

  const [dummyImages, setDummyImages] = useState<Image[]>([]);
  const [image, setImage] = useState(null);


/*   const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }; */

  useEffect(() => {
    const fetchMealImages = async () => {
      try {
        const response = await axios.get( 'https://www.themealdb.com/api/json/v1/1/random.php',{
          params: {
            number: 3, // Fetch 3 random meals
          },
        });
        if (response.data.meals) {
          setDummyImages(response.data.meals);
        }
      } catch (error) {
        console.error('Error fetching meal images:', error);
      }
    };
    fetchMealImages();
  }, []);


  const handleSaveEdit = (recipe: Recipe) => {

  }


  return (

    <div className='image-wrapper'>
      {image && (
        <div>
          <h2>Image Preview:</h2>
          <img src={defaultImage} alt="recipe" />

          <img id="image-preview" src="" alt="Recipe Preview" />
        </div>
      )}
      {dummyImages.map((image) => (
        <>
    {/*       <h2>{image.strMeal}</h2> */}
          <img key={image.idMeal} src={image.strMealThumb} alt={image.strMeal} />
        </>
      ))}
    </div>

  )
}
