import React, { useState } from 'react';
import styles from './Planner.module.scss';
import Navbar from '../../components/Navigation/navbar';


export const Planner = () => {

    return (
        <>
            <Navbar transparentThreshold={100} />
            <div className={styles.planner}>
                <h1>HERE IS THE Plan</h1>

            </div>
        </>
    )
};

