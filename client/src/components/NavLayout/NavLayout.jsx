import React, { useState } from 'react';
import { AppBar, Badge, Box, Button, Drawer, Typography, styled } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout, toggleMode } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/appSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import CancelIcon from '@mui/icons-material/Cancel';



function NavLayout() {
  const User = useSelector(state => state.auth.user);
  const CartItems = useSelector(state => state.commerce.cart);
  const currentMode = useSelector(state => state.auth.mode);
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const dispatch = useDispatch();

  const loggingOut = () => {
    dispatch(setLogout())
    dispatch(clearCart())
  }

  const StyledBars = styled(Button)({
    padding: '5px 20px',
    margin: '0.4rem 0.2rem',
    color: 'white',
    display: 'block',
  })
  const StyledMenuButton = styled(Button)({
    padding: '5px 20px',
    margin: '1rem 0.2rem',
    color: 'inherit',
    display: 'block',
    width: '100%',
  })

  return (
    <Box>
      <AppBar
        sx={{
          padding: { lg: '10px 15px', md: '-10px' },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky'
        }} >
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center'
          }}>

          <Drawer
            anchor='right'
            open={isToggleMenu}
          >
            <CancelIcon sx={{ float: 'right', cursor: 'pointer' }} onClick={() => setIsToggleMenu(false)} />
            <Box
              sx={{
                width: '300px'
              }}
            >

              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SHOPify
              </Typography>
              <Box sx={{ margin: '0 auto' }}>
                <StyledMenuButton onClick={() => setIsToggleMenu(false)}>
                  <NavLink to='home'
                    style={{ textDecoration: 'none', fontWeight: '700', color: 'inherit' }}> Home </NavLink>
                </StyledMenuButton>

                <StyledMenuButton onClick={() => dispatch(toggleMode())}>
                  {currentMode === "light" ? <NightsStayIcon /> : <WbSunnyIcon />}
                </StyledMenuButton>

                <StyledMenuButton onClick={() => loggingOut()}> Logout </StyledMenuButton>
              </Box>
            </Box>
          </Drawer>
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHOPify
          </Typography>

          <StyledBars>
            <NavLink to='home'
              style={{ textDecoration: 'none', fontWeight: '700', color: 'inherit' }}> Home </NavLink>
          </StyledBars>
          <StyledBars onClick={() => dispatch(toggleMode())}>
            {currentMode === "light" ? <NightsStayIcon /> : <WbSunnyIcon />}
          </StyledBars>
          <StyledBars onClick={() => loggingOut()}> Logout </StyledBars>

        </Box>
        <Box>
          <StyledBars>
            <MenuSharpIcon
              sx={{
                display: { xs: 'block', xl: 'none' }
              }}
              onClick={() => setIsToggleMenu(true)}
            />
          </StyledBars>
        </Box>

        <Box display='flex' alignItems='center'>
          <Box
            sx={{
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Typography variant='h6' sx={{ marginRight: '2rem' }}> Welcome  {User?.name} ! </Typography>
          </Box>
          <StyledBars>
            <NavLink to='cart' style={{ textDecoration: 'none' }}>
              <Badge badgeContent={CartItems.length} color='error'>
                <ShoppingCartIcon sx={{ color: 'white' }} />
              </Badge>
            </NavLink>
          </StyledBars>
        </Box>
      </AppBar>

      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}

export default NavLayout