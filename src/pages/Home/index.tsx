import React from 'react';
import Navbar from '../../components/Navigation/navbar';
import Header from '../../components/Header/Header';

export const Home = () => (

  <div className='home'>
    <Navbar transparentThreshold={100}/>
    <Header />

    {/*       
    <div className='next-component'></div>
    <Toaster position="bottom-center" />
    <AddTodo />
    <TodoList />
    */}
  </div>

);

