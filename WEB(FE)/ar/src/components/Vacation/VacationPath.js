import React, { useState } from 'react'
import VacationInput from './VacationInput';

const VacationPath = () => {
  const PathInfo = [
    {
      'station' : '',
      'IsArrived' : false,
    }
  ]
  const [click, setClick] = useState(false);

  const onClick = () => {
    setClick(true);
  }
  const onPathSubmit = (e) =>{
    e.preventDefault();
    
  }

  return (
    <>
        <section className='start-path'>
          <div className='input-line' >
            <VacationInput />
          </div>
          <button 
            name='send-to-boss'
            value='Send'
            onSubmit = {onPathSubmit}
          />
        </section>
    </>
  )
}

export default VacationPath