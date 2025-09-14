import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';

const DashboardLayout = ({activeMenu, children}) => {
    const {user} = useContext(UserContext);

  return (
    <div className='min-h-screen bg-gray-100/20'>
        <Navbar activeMenu={activeMenu} />
        {user && <div className="container mx-auto max-w-7xl py-5">{children}</div>}
    </div>
  )
}

export default DashboardLayout