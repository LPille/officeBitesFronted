import React, { useState } from 'react';
import styles from './ModalAddRecipe.module.scss';
import ChooseCreatingMood from './Steps/ChooseCreatingMood';
import { useRecipe } from 'src/context';
import GenerateRecipe from './GenerateRecipe/GenerateRecipe';
import { generateText } from '../../services/openaiServices';


interface RecipeModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalAddRecipe: React.FC<RecipeModalProps> = ({ isOpen, closeModal }) => {
  const [recipeName, setRecipeName] = useState('');
  const [creatingMood, setCreatingMood] = useState('');
  const { handleAddRecipe } = useRecipe()


  const [generatedText, setGeneratedText] = useState('');

  const handleGenerateText = async () => {
    const text = await generateText('Generate text based on this prompt.');
    setGeneratedText(text);
    console.log('Generated text:', text)
  }

  const handleRecipeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Recipe Name:', recipeName);
    closeModal();
  };


 const handleCreationMood = (mood: string) => {
    if(mood === "blank") {
      closeModal();
      handleAddRecipe();
    } else{
      setCreatingMood(mood);
    }
  };


  
  return (
    <div className={styles.modalContainer}>
      { !creatingMood && (
        <ChooseCreatingMood handleCreationMood={handleCreationMood} />
      )}
      { creatingMood && (
        <GenerateRecipe />
      )}


    
{/*     <div className={styles.headerContainer}>
      <h1 className={styles.header}>Add Recipe</h1>
    </div>
      <h2>Add Recipe</h2>
      <label htmlFor="recipeName">Recipe Name:</label>
      <input
        type="text"
        id="recipeName"
        value={recipeName}
        onChange={handleRecipeNameChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={closeModal}>Cancel</button>
      <div className={styles.footer}>

      </div> */}
    </div>
  );
};

export default ModalAddRecipe;
