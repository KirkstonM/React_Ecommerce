import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/appSlice';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import ImageWidget from '../components/SingleComponent/ImageWidget';
import DetailsWidget from '../components/SingleComponent/DetailsWidget';
import Loader from '../components/Loader';

function SingleItem() {

  const [itemDetail, setItemDetail] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)

  const fetchDetails = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await response.json()
      setItemDetail(data);
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDetails();
  }, [id])

  return (
    <Box>
      <Paper elevation={3}
        sx={{
          width: { xs: 'auto', lg: '70%' },
          height: '700px',
          margin: "30px auto",
          padding: '1rem'
        }}>
        <Box
          sx={{
            height: '100%',
            display: { xs: 'block', lg: 'flex' },
          }}
        >
          {
            isLoading ?
              (<Loader />) :
              (
                <>
                  <ImageWidget image={itemDetail.image} title={itemDetail.title} />
                  <DetailsWidget data={itemDetail} />
                </>
              )
          }

        </Box>
      </Paper>
    </Box>
  )
}

export default SingleItem