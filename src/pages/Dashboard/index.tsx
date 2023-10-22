import React, { useState } from 'react';
import styles from './Dashboard.module.scss';
import Navbar from '../../components/Navigation/navbar';
import { RecipeList } from 'src/components/List/List';
import AddRecipe from 'src/components/List/Add';
import { useRecipe } from '../../context'
import { EditRecipe } from 'src/components/EditRecipe/Edit';
import ModalAddRecipe from 'src/components/ModalAddRecipe/ModalAddRecipe';
import Modal from 'src/components/Modal';

export const Dashboard = () => {

  const { editingRecipe: editingReceipe } = useRecipe()

  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

  const openModal = () => {
    setIsAddRecipeModalOpen(true);
  };

  const closeModal = () => {
    setIsAddRecipeModalOpen(false);
  };


  return(
    <>
      <Navbar transparentThreshold={100}/>
      <div className={styles.dashboard}>
        <div className={styles.dashboardWrapper}>
          { editingReceipe ? (  
              <EditRecipe />      
            ) : (
            <>
              <AddRecipe openModal={openModal} />
              <RecipeList />
            </>
           )
          }
        </div>
        <Modal className={styles.modalWrapper} isOpen={isAddRecipeModalOpen} closeModal={closeModal}>
          <ModalAddRecipe isOpen={isAddRecipeModalOpen} closeModal={closeModal} />
        </Modal>
        {/*       
        <div className='next-component'></div>
        <Toaster position="bottom-center" />
      */}
      </div>
    </>
  )
};

