import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const Navbar = () => {
  return (
    <React.Fragment>
      <AppBar color='primary'>
          <Toolbar>
              <IconButton size='large' edge = 'start' color='inherit' aria-label='logo'>
                  <SportsBasketballIcon />
              </IconButton>
              <Typography variant='h6' component={'div'}>
                  Mavs Webiste
              </Typography>
          </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Navbar;