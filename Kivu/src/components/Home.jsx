import React from 'react'
import NavBar from './NavBar'
import{ useSelector,useDispatch } from 'react-redux';

const Home = () => {
  const username=useSelector((state)=>state.username.value)
  const gender= useSelector((state)=>state.gender.value)
  return (
    <div>
        <NavBar/>
        <div className='h-60 flex justify-center flex-col pl-12 pb-12'>
          <h1 className='font-robotoserif font-extrabold text-4xl pb-2'>Hello, <span className='p-2 text-orange-800 line'>{gender==='male'?'Mr. ':'Ms. '} {username} </span> </h1>
          <p  className='font-quicksand text-md font-bold text-slate-700'>Hope you are having a Wonderful Day!</p>
        </div>


    </div>
  )
}

export default Home
