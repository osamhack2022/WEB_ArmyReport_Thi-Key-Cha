import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'



import './ProductNavBar.module.css';

const ProductNavBar = ({props}) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  }

  return (
    <>
      <ul onClick={handleClick} className={click ? 'dropdown-menu-clicked' : 'dropdown-menu'}>
        {props.map((item, index)=> {
          return(
            <li>
              <Link
                className={item.cName}
                to={item.path}
                onClick={()=> setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ProductNavBar;