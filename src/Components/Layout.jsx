import React from 'react'
import SideBar from './Common/Sidebar'

const Layout = ({children}) => {
  return (
    <>
    <SideBar children={children}/>    
    </>
  )
}

export default Layout
