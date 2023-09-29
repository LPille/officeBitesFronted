import React from 'react';
import './styles.scss';
import Navbar from '../../components/Navigation/navbar';
import { ReceipeList } from 'src/components/List/ReceipeList';
import { AddReceipe } from 'src/components/List/AddReceipe';

export const Dashboard = () => (
  <>
    <Navbar />
    <div className='dashboard'>
      <div className='dashboard-wrapper'>
        <AddReceipe />
        <ReceipeList />
      </div>
      {/*       
      <div className='next-component'></div>
      <Toaster position="bottom-center" />
    */}
    </div>
  </>

);

