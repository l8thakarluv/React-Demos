import React, { useState } from 'react'

export default function (props) {
    const handleUpperClick = () => {
        console.log('Uppercase cliked');
        setText(text.toUpperCase());
        props.showAlert('Text converted to uppercase', 'success');
    }

    const handleLowerClick = () => {
        setText(text.toLowerCase());
        props.showAlert('Text converted to lowercase', 'success');
    }

    const handleClearTextClick = () => {
        setText('');
        props.showAlert('Text cleared', 'success');
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        props.showAlert('Text copied to clipboard', 'success');
    }

    const handleRemoveSpaceClick = () => {
        const newTextData = text.split(/[ ]+/);
        setText(newTextData.join(' '));
        props.showAlert('Text space removed', 'success');
    }

    const handleOnChange = (event) => {
        console.log('handle on change called');
        setText(event.target.value);
    }
    // where useText is a hook
    const  [text, setText] = useState('Enter text here');
    return (
        <>
        <div className="container" style={{
                    color: props.mode === 'dark' ? 'white' : '#042743' 
                }}>
            <div className="mb-3">
                <h1 className='mb-2'>{props.heading}</h1>
                {/* <label for="myBox" className="form-label">Example textarea</label> */}
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{
                    backgroundColor: props.mode === 'dark' ? '#042743' : 'white',
                    color: props.mode === 'dark' ? 'white' : '#042743'
                }} id="myBox" rows="8"></textarea>
            </div>
            <button className="btn btn-primary mx-1 my-1" onClick={handleUpperClick} disabled={!text || !text.length}>Convert to Uppercase</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleLowerClick} disabled={!text || !text.length}>Convert to Lowercase</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleClearTextClick} disabled={!text || !text.length}>Clear Text</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleCopyClick} disabled={!text || !text.length}>Copy to clipboard</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleRemoveSpaceClick} disabled={!text || !text.length}>Remove Extra Space</button>
        </div>
        <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
            <h1>Your text summary</h1>
            {/* \s which indicates split text by empty space including a new line */}
            <p>total words: {text.split(/\s/).filter(element => !!element).length} & total characters: {text.length}</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
        </>
    )
}
