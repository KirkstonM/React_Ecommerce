import { Box, Button, Drawer, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoryProducts, fetchProducts } from '../../redux/slices/appSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';


function CathegoryWidget() {

    const [cathegory, setCathegory] = useState([]);
    const dispatch = useDispatch();
    const [isShowMenu, setIsShowMenu] = useState(false);

    const fetchCathegory = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products/categories")
            const data = await response.json();
            setCathegory(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchCathegory();
    }, [])


    const StyledButton = styled(Button)(({ theme }) => ({
        width: '100%',
        padding: '15px 0px',
        margin: '6px 0',
        display: 'block',
        color: theme.palette.primary.dark
    }))

    return (
        <Box
            sx={{
                flex: { xs: '0', lg: '1' },
                padding: '1'
            }}
        >

            <Button sx={{
                position: 'sticky',
                display: { xs: 'block', lg: 'none' },

            }}
                onClick={() => setIsShowMenu(true)}
            > <ArrowForwardIosIcon /> </Button>
            <Drawer
                anchor='left'
                open={isShowMenu}
            >
                <Box sx={{
                    width: '250px'
                }}
                >
                    <CancelIcon sx={{ float: 'right', cursor: 'pointer' }} onClick={() => setIsShowMenu(false)} />
                    {
                        cathegory.map(item => (
                            <StyledButton onClick={() => dispatch(categoryProducts(item)) && setIsShowMenu(false)}>
                                {item}
                            </StyledButton>
                        ))
                    }
                </Box>
            </Drawer>
            <Box sx={{
                position: 'fixed',
                width: '300px',
                display: { xs: 'none', lg: 'block' }
            }}>
                {
                    cathegory.map((items, i) => {
                        return (
                            <StyledButton key={i} onClick={() => dispatch(categoryProducts(items))}>
                                {items}
                            </StyledButton>
                        )
                    })
                }
                <StyledButton onClick={() => dispatch(fetchProducts())}>
                    All
                </StyledButton>
            </Box>
        </Box>
    )
}

export default CathegoryWidget