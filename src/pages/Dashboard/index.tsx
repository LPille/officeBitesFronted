import React from 'react';
import './styles.scss';
import Navbar from '../../components/Navigation/navbar';
import { RecipeList } from 'src/components/List/List';
import { AddRecipe } from 'src/components/List/Add';
import { useRecipe } from '../../context'
import { EditRecipe } from 'src/components/EditRecipe/Edit';

export const Dashboard = () => {

  const { editingRecipe: editingReceipe } = useRecipe()


  return(
    <>
      <Navbar transparentThreshold={100}/>
      <div className='dashboard'>
        <div className='dashboard-wrapper'>
          { editingReceipe ? (  
              <EditRecipe />      
            ) : (
            <>
              <AddRecipe />
              <RecipeList />
            </>
           )
          }
        </div>
      
        {/*       
        <div className='next-component'></div>
        <Toaster position="bottom-center" />
      */}
      </div>
    </>
  )
};

