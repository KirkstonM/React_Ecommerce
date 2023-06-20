import React from 'react';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Welcome from '../pages/Welcome';
import NavLayout from '../components/NavLayout/NavLayout';
import { useSelector } from 'react-redux';
import SingleItem from '../pages/SingleItem';

function Routes() {

  const isAuth = Boolean(useSelector(state => state.auth.token));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Welcome />} />
        <Route element={<NavLayout />}>
          <Route
            path='home'
            element={isAuth ? <Home /> : <Navigate to='/' />}
          >
          </Route>

          <Route path="home/:id" element={<SingleItem />} />

          <Route path='cart'
            element={isAuth ? <Cart /> : <Navigate to='/' />} />
        </Route>
      </Route>
    )
  );
  return (

    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Routes