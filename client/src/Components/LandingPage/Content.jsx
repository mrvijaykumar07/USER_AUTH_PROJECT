import React, { useContext } from 'react'
import { DataContext } from '../../Data/DataProvider'

const Content = () => {
const {fname,lname}=useContext(DataContext);

  return (
<div className='flex flex-col justify-center items-center font-bold text-[60px] md:text-[100px] h-[500px]'>   
  <div className='text-orange-400 block '>WELCOME</div> 
  <div className='block'>{fname} {lname}</div>
</div>
  )}

export default Content;
