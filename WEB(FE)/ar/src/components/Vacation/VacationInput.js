import React, { useRef, useState } from 'react'

const VacationInput = () => {

    const nextID = useRef(1);
    const [inputItems, setInputItems] = useState([{
        'id' : '0',
        'title' : ''
    }]);

    const [PathInfo, setPathInfo] = useState({
        'Station' : '',
        'IsArrived' : false
    });
    const inputRef = useRef();
    
    const addInput = () => {
        const input = {
            id : nextID.current,
            title : ''
        };

        setInputItems([...inputItems, input]);
        nextID.current += 1;
    }

    const deleteInput = () => {
        setInputItems(inputItems.filter(item => item.id !== index))
    }
    const  handleChange = (e, index) => {
        e.preventDefault();
        if (index > inputItems.length) return ;

        const inputItemsCopy = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[index].title = e.target.value; 
        setInputItems(inputItemsCopy);
    }

    const onChange = (e) => {
        const {
            target: {name, value}
        } = e;
        setPathInfo({
            ...PathInfo,
            [name] : value
        });
    };

    const onClick = (e) => {
        if (e.target.value === '-'){
            
        }else if(e.target.value === '+'){

        }else{
            console.log(error);
        }
    }
    return (
        <>
            { inputItems.map((item, index) => (
                <div className='vacation-path' key={index}>
                    <label htmlFor="path-text">
                        경로 {index}
                    </label>
                    <input 
                        name="station"
                        type="text" 
                        placeholder='경로를 입력하세요'
                        ref={inputRef}
                        maxlength='20'
                        value={item.title}
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
            <div id='vacation-path'>
                <input 
                    name="IsArrived"
                    type="checkbox"
                    onChange={onChange}
                    className='path-pass'
                />
                
                
            </div>
        </>
    )
}

export default VacationInput