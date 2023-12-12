import React from 'react'
import SideBar from './Common/Sidebar'
import { Box, Grid } from '@mui/material'
import Header from './Common/Header'
import Footer from './Common/Footer'


const Layout = ({ children }) => {

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={3} lg={2}>
          <SideBar />
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Header />
          <Box padding={2}>
            {children}
          </Box>
          <Footer />
        </Grid>
      </Grid>
    </>
  )
}

export default Layout
