import React, { useEffect, useState } from 'react';
import styles from './GenerateRecipe.module.scss';
import { generateText } from '../../../services/openaiServices';
import MultipleSelect from './MultipleSelect';
import { meal_types, dish_types, health_types, cuisine_types } from './MockData';

interface GenerateRecipeProps {
 // handleCreationMood: (mood: string) => void;
}

const GenerateRecipe: React.FC<GenerateRecipeProps> = ({}) => {

  const clickCreatingMood = (mood : string) => {
   // handleCreationMood(mood);
  }

  useEffect(() => {
    console.log("GenerateRecipe");
  }, []);
  
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerateText = async () => {
    const text = await generateText('Generate text based on this prompt.');
    setGeneratedText(text);
    console.log('Generated text:', text)
  }

  return (
    <div className={styles.GenerateRecipeContainer}>


          <div className={styles.moodBlank} onClick={handleGenerateText}>
            <p>Add Blanksss</p>
            <MultipleSelect items={cuisine_types} name={"Cuisine"} id={'cuisine'}></MultipleSelect>
          </div>

    </div>
  );
};

export default GenerateRecipe;
