import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/appSlice';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

function MainWidget() {
  const homeItems = useSelector(state => state.commerce.shopItems);
  const loading = useSelector(state => state.commerce.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchProducts())
  }, []);

  return (
    <Box
      sx={{
        flex: '6',
        padding: '50px 0'
      }}>
      <Container maxWidth="xl">
        <Stack spacing={2} useFlexGap
          sx={{
            flexDirection: "row",
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          {loading ?
            (<Loader />) :
            (<>
              {
                homeItems.map(item => {
                  return <Link to={`/home/${item.id}`} style={{ textDecoration: 'none' }} key={item.id}>
                    <Paper

                      elevation={3}
                      sx={{
                        width: { xs: '180px', xl: '350px' },
                        height: { xs: 'auto', xl: '420px' },
                        padding: { sx: '10px', xl: "15px" }
                      }}>
                      <img src={item.image} alt={item.title} loading='lazy'
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          width: '100%',
                          height: '200px'
                        }}
                      />
                      <Typography variant='h6'
                        sx={{
                          marginTop: '10px',
                          minHeight: { xs: '0px', xl: '100px' },
                          fontSize: { xs: '12px', xl : '20px'}
                        }}>
                        {item.title}
                      </Typography>
                      <br />
                      <Typography variant='h6'
                        sx={{
                          fontSize: { xs: '15px', xl : '20px' }
                        }}
                      >
                        Price :{item.price}
                      </Typography>
                    </Paper>
                  </Link>
                })
              }
            </>
            )}
        </Stack>

      </Container>
    </Box>
  )
}

export default MainWidget