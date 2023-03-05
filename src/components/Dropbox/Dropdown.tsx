import './Dropdown.scss';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import React, { useState, useRef, useEffect } from 'react';

interface IProps { region: string | null, changeRegion: (region: string) => void }

export default function Dopdown({ region, changeRegion }: IProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  function handleSetRegion(e: React.MouseEvent<HTMLLIElement>) {
    const target = e.target as HTMLLIElement;
    setIsOpen(false);
    changeRegion(target.textContent!)
  }

  return (
    <div className='dropdown' ref={dropdownRef}>
      <button onClick={toggleDropdown} >{!region ? 'Filter by Region' : region} {isOpen ? <RiArrowDropUpLine size={20} /> : <RiArrowDropDownLine size={20} />}</button>
      <ul className='list__items' style={{ height: isOpen ? '190px' : '0px', zIndex: isOpen ? '10' : '-1', transition: 'height .2s ease-out' }}>
        <li onClick={handleSetRegion}>Africa</li>
        <li onClick={handleSetRegion}>Americas</li>
        <li onClick={handleSetRegion}>Asia</li>
        <li onClick={handleSetRegion}>Europe</li>
        <li onClick={handleSetRegion}>Oceania</li>
      </ul>
    </div>
  );
}