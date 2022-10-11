import React from 'react'

const Loading = () => {
  return (
    <>
        <img 
            src="AR_Logo.png" 
            alt='AR_Logo'
            className='loading-img'
        />
        <span className='loading-text'>접속중..</span>
    </>
  )
}

export default Loading;