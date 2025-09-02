import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
0
const DashboardLayout = ({activeMenu, children}) => {
    const {user} = useContext(UserContext);

  return (
    <div className='min-h-screen bg-gray-100/20'>
        <Navbar activeMenu={activeMenu} />
        {user && <div className="container mx-auto py-4">{children}</div>}
    </div>
  )
}

export default DashboardLayout