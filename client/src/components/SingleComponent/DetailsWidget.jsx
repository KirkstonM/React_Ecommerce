import React, { useState } from 'react';
import { Box, Button, Typography, Divider, styled } from '@mui/material';
import { addToCart } from '../../redux/slices/appSlice';
import { useDispatch } from 'react-redux';

function DetailsWidget(props) {
  const { title, rating, description, price, id, image } = props.data;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const StyledButton = styled('button')({
    background: 'lightgrey',
    color: 'grey',
    width: '35px',
    padding: '3px 5px',
    border: 'none',
    fontSize: '23px',
    borderRadius: '5px',
    cursor: 'pointer',
    "&:hover": {

    }
  })

  function decreaseQuantity() {
    setQuantity(prev => prev === 1 ? 1 : prev - 1)
  };

  function increaseQuantity() {
    setQuantity(prev => prev + 1)
  };

  function handleCart() {
    dispatch(addToCart({
      title,
      rating,
      description,
      price,
      id,
      image,
      quantity
    }))
  };


  return (
    <Box flex={4} padding='20px 0'>
      <Typography variant='h4'> {title} </Typography>

      <Box display='flex' padding={1} marginTop='1rem'>
        <Box sx={{ background: 'lightblue', width: '100px' }}> {rating?.rate}</Box>
        <Box sx={{ background: 'lightpink', width: '100px', marginLeft: '20px' }}> {rating?.count}</Box>
      </Box>

      <Box sx={{ marginTop: '2rem', minHeight: '200px' }}>
        <Typography variant='p'
          sx={{ fontSize: '18px', fontFamily: 'arial', color: 'grey' }}
        > {description} </Typography>
      </Box>

      <Divider></Divider>

      <Box marginTop='10px'>
        <Typography variant='h3' sx={{ color: 'warning.dark' }}> $ {price} </Typography>
      </Box>

      <Box marginTop={5}>
        <Typography variant='div' sx={{ marginRight: '25px' }}> Quantity </Typography>

        <StyledButton onClick={decreaseQuantity} disabled={quantity === 1}> - </StyledButton>

        <Typography variant='span'
          sx={{ padding: '3px 5px', margin: '0 7px', fontSize: '20px' }}
        > {quantity} </Typography>

        <StyledButton onClick={increaseQuantity} disabled={quantity === 10}> + </StyledButton>
      </Box>
      <Box sx={{ marginTop: '50px', textAlign: 'center' }}>

        <Button variant='outlined' color='success' sx={{ padding: '15px 100px' }}
          onClick={handleCart}
        > Add to cart </Button>
      </Box>
    </Box>
  )
}

export default DetailsWidget