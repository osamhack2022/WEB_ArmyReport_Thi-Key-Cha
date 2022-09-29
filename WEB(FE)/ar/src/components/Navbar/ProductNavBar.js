import React from 'react'
import { Link } from 'react-router-dom'

const ProductNavBar = (title, items) => {
  return (
    <div className="dropDownBar">
        <li className="dropDown">
            <Link className='navIntro' to={`${items}`}>
                {title}
            </Link>
        </li>
    </div>
  )
}

export default ProductNavBar;