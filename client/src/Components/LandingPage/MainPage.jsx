import React from 'react'
import Navbar from './Navbar'
import Content from './Content'
import { Outlet } from 'react-router-dom'; 
const MainPage = () => {
  return (
 <>
 <Navbar/>
 <Outlet /> 
 <Content/>
 </>
  )
}

export default MainPage
