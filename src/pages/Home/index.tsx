import React from 'react';
import Navbar from '../../components/Navigation/navbar';
import Header from '../../components/Header/Header';
import styles from './Home.module.scss';
import { To, useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <div className='home'>
      <Navbar transparentThreshold={100} />
      <Header />
      <div className={styles.section}>

        <div className={styles.card} onClick={() => navigateTo('/planner')}>
          <h1>Planner</h1>
        </div>

      </div>
      {/*       
    <div className='next-component'></div>
    <Toaster position="bottom-center" />
    <AddTodo />
    <TodoList />
    */}
    </div >

  )
};

