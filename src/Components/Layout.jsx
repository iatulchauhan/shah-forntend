import React from 'react'
import SideBar from './Common/Sidebar'
import { Box, Grid } from '@mui/material'
import Header from './Common/Header'
import Footer from './Common/Footer'


const Layout = ({ children }) => {

  return (
    <>
          {/* <Header /> */}
          <Box padding={2}>
          <SideBar children={children}/>
            
          </Box>
    </>
  )
}

export default Layout
