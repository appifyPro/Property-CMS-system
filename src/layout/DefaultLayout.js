import React  from 'react'
import {  AppSidebar, AppFooter, AppHeader } from '../components/index'
//import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  // const  navigate=useNavigate
  // useEffect(()=>
  // {
  //   navigate('/')
  // })
 
  return (
    
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-5 mx-5 pt-5">
          
          <h1>Welcome to Dashboard</h1>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
