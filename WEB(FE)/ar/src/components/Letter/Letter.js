import React, { useRef, useState } from 'react'

const Letter = () => {
    const [letter, setLetter] = useState({
        'LetterNum' : 0,
        'content' : ''
    });
    const contentRef = useRef();
    const numRef = useRef(1);
    const onSubmit = (e) => {
        e.preventDefault();
        setLetter({
            ...letter,
            content : inputRef.current.value
        });
        
        
    }

    return (
        <>
            <div className="content">
                <input 
                    name="content"
                    type="text"
                    maxLength={1000}
                    autoComplete="off"
                    placeholder='1000자 이내로 작성해주세요!'
                    required
                />
                <button className="send">
                    Send
                </button>
                <button className="cancel">
                    Cancel
                </button>
            </div>
        </>
    )
}

export default Letter