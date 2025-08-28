import React from 'react'
import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
  return (
    <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-2.5  sticky top-0 z-30'>
        <div className='conrainer mx-auto flex items-center justify-between gap-5'>
            <Link to='/dashboard'>
                <h1 className='text-lg md:text-xl font-medium leading-5 text-black'>Resumify Sync</h1>
            </Link>

            <ProfileInfoCard/>
        </div>
    </div>
  )
}

export default Navbar