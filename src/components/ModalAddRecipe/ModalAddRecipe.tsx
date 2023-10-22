import React, { useState } from 'react';
import styles from './ModalAddRecipe.module.scss';

interface RecipeModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalAddRecipe: React.FC<RecipeModalProps> = ({ isOpen, closeModal }) => {
  const [recipeName, setRecipeName] = useState('');

  const handleRecipeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
  };

  const handleSubmit = () => {
    // Add your recipe submission logic here
    // For simplicity, we'll just log the recipe name
    console.log('Recipe Name:', recipeName);
    closeModal();
  };


  
  return (
    <>
    <div className={styles.headerContainer}>
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

      </div>
    </>
  );
};

export default ModalAddRecipe;
