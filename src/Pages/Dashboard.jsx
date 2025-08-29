import React, { useEffect } from 'react'

const Dashboard = () => {

  useEffect(() => {
    // Fetch user data or perform any necessary actions
  }, []);

  return (
    <div className='bg-light-primary '>  
      <h2 className='text-2xl font-bold text-light-text'>Dashboard</h2>
      <p className='text-dark-text'>Welcome to your dashboard!</p>
    </div>
  )
}

export default Dashboard