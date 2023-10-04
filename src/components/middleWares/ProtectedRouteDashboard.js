import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const ProtectedRouteDashboard = (props) => {
  const { Component } = props
  const navigate = useNavigate()
  
  useEffect(()=>{
    let login = localStorage.getItem('token')
   if(!login)
   {
    navigate('/login')
   }
  },[navigate])

  useEffect(() => {
    let login = localStorage.getItem('token')
    if (login) {
      navigate('/')
    }
  
  },[navigate])

  return (
    <div>
      <Component />
    </div>
  )
}

ProtectedRouteDashboard.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default ProtectedRouteDashboard
