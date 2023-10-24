import React, { useEffect, useState } from 'react';
import styles from './GenerateRecipe.module.scss';
import { generateText } from '../../../services/openaiServices';
import MultipleSelect from './MultipleSelect';
import { meal_types, dish_types, health_types, cuisine_types } from './MockData';
import cx from 'classnames';

interface GenerateRecipeProps {
 // handleCreationMded: (mode: string) => void;
}

const GenerateRecipe: React.FC<GenerateRecipeProps> = ({}) => {

  const clickCreatingMode = (mode : string) => {
   // handleCreationMode(mode);
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
    <div className={styles.generateRecipeContainer}>
    {/*  <div className={styles.modeBlank} onClick={handleGenerateText}></div> */}
      <div className={styles.header}>
        <h1>Build your Recipe</h1>
      </div>
      <div className={cx('row',styles.body)}>
        <MultipleSelect items={meal_types} name={"Meal"} id={'meal'} label="What kind of Meal do you want?"></MultipleSelect>
        <MultipleSelect items={cuisine_types} name={"Cuisine"} id={'cuisine'} label="Can we define a Cuisine?"></MultipleSelect>
        <MultipleSelect items={health_types} name={"Health"} id={'health'} label="Any Health preferences?"></MultipleSelect>
        <MultipleSelect items={dish_types} name={"Dish"} id={'dish'} label="Which kind of Dish should be included?"></MultipleSelect>
      </div>   
      <div className={cx('row',styles.footer)}>
        <button className={styles.button} onClick={handleGenerateText}>Generate Recipe</button>
      </div>
    </div>
  );
};

export default GenerateRecipe;
