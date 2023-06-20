import { Box, Button, Card, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../redux/slices/appSlice';

function Cart() {

  const cartDetails = useSelector(state => state.commerce.cart);
  const dispatch = useDispatch();

  const itemCosts = cartDetails.map(item => item.quantity * item.price);
  const totalCost = itemCosts.reduce((accumulator, cost) => accumulator + cost, 0);
  const roundedTotal = totalCost.toFixed(2);

  return (
    <>
      <Box>
        <Paper elevation={2}
          sx={{
            width: { xs: '90%', md: "60%" },
            height: '700px',
            padding: '1rem',
            margin: '30px auto'
          }}
        >
          {
            cartDetails.length === 0 ?
              (<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h4'> Your Cart Is Empty </Typography>
              </Box>)
              :
              (
                <Box sx={{ maxHeight: '550px', minHeight: '550px', overflowY: "auto" }}>
                  <ol>
                    {
                      cartDetails.map(item => {
                        return <li key={item.id}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', minHeight: '50px' }}>
                            <Box sx={{ width: '400px' }}>
                              {item.title} </Box>
                            <Box
                              sx={{ display: { xs: 'none', lg: 'block' } }}
                            > X {item.quantity} </Box>
                            <Box color='info.dark'
                              sx={{ display: { xs: 'none', lg: 'block' } }}
                            > $ {item.price * item.quantity}</Box>
                            <Button variant='contained' color='error' size='small' onClick={() => dispatch(removeItem({ id: item.id }))}> Remove from cart</Button>
                          </Box>
                          <Divider sx={{ margin: '20px 0' }} />
                        </li>
                      })
                    }

                  </ol>
                </Box>
              )
          }
          {
            cartDetails.length > 0 &&

            <Box sx={{ marginTop: '50px', float: 'right', marginRight: '50px', p: '10px' }}>
              <Typography variant='h5'> Total Cost :
                <Typography variant='span' color='warning.dark'> $ {roundedTotal} </Typography>
              </Typography>
            </Box>
          }
        </Paper>
      </Box>
    </>
  )
}

export default Cart