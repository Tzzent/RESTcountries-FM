import './InputSearch.scss';
import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface Iprops { handleSearchCountry: (country: string) => void, handleOnFocus: () => void }

export default function InputSearch({ handleSearchCountry, handleOnFocus }: Iprops) {

  return (
    <div className='search__input'>
      <RiSearchLine size={18} className='icon' />
      <input
        type="text"
        placeholder='Search for a country'
        onChange={(ev) => handleSearchCountry(ev.target.value)}
        onFocus={() => handleOnFocus()}
      />
    </div>
  )
}
