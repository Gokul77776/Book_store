import React from 'react'
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'


const Backbtn = ({destination = '/'}) => {
  return (
    <div className='flex'>
        <Link to={destination} className="text-blue-500 text-2xl mr-2 cursor-pointer transition-colors duration-300 hover:text-blue-700" >
        <BsArrowLeft  className="text-2xl mr-6" />
       
        </Link>
    </div>
  )
}

export default Backbtn