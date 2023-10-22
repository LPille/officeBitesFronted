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

    const options = {
      method: 'GET',
      url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
      params: {
        'cuisineType': 'Asian',
      },
      headers: {
        'X-RapidAPI-Key': 'e74f37d68fmsh2f9745c942a1a40p189d4fjsn3eaf1cb0f2b0',
        'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
      }
    };


    const list = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

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
    list()
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
        <div key={image.idMeal}>
          <h2>{image.strMeal}</h2>
          <img src={image.strMealThumb} alt={image.strMeal} />
        </div>
      ))}
    </div>

  )
}
