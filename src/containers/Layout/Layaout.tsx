import './Layaout.scss';
import React from 'react';
import Navbar from '../../components/Navbar';

interface IChildren {
  children: React.ReactNode
}

export default function Layaout({ children }: IChildren) {
  return (
    <>
      <Navbar />
      <div className='outlet__container'>
        {children}
      </div>
    </>
  );
}