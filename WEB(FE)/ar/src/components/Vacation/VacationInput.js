import React, { useRef, useState } from 'react'

import './VacationInput.module.css'

const VacationInput = () => {

    const nextID = useRef(1);
    const [inputItems, setInputItems] = useState([{
        'id' : '0',
        'Station' : '',
        'IsArrived' : false,
    }]);
    
    const addInput = () => {
        const input = {
            id : nextID.current,
            Station : '',
            IsArrived : false,
        };

        setInputItems([...inputItems, input]);
        nextID.current += 1;
    }

    const deleteInput = () => {
        setInputItems(inputItems.filter(item => item.id !== index))
    }

    const handleChange = (e, index) => {
        e.preventDefault();
        if (index > inputItems.length) return ;

        const inputItemsCopy = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[index].Station = e.target.value; 
        setInputItems(inputItemsCopy);
    }

    const ArrivedCheckbox = ({target}) => {
        
    }

    return (
        <>
            { inputItems.map((item, index) => (
                <div className='vacation-path' key={index}>            
                    <div id='vacation-path'>
                        <input 
                            name="IsArrived"
                            type="checkbox"
                            checked={item.IsArrived}
                            onChange={(e)=> ArrivedCheckbox(e)}
                            className='path-pass'
                        />
                    </div>
                    <label htmlFor="path-text">
                        경로 {index}
                    </label>
                    <input 
                        name="station"
                        type="text" 
                        placeholder='경로를 입력하세요'
                        maxLength='20'
                        value={item.Station}
                        onChange={handleChange}
                        autoComplete='off'
                        className={`title-${index}`}
                        required
                    />
                    { index === 0 && item.length < 4 && (
                        <button className='vacation-path-btn' onClick={addInput}>
                        +
                        </button> 
                    )}
                    { index > 0 && item[index-1] ? (
                        <button className='vacation-path-btn' onClick={deleteInput}>
                        -
                        </button>) : (
                            ''
                    )}
                </div>
            ))}
        </>
    )
}

export default VacationInput