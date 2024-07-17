import React, { useState } from 'react'

export default function (props) {
    const handleUpperClick = () => {
        console.log('Uppercase cliked');
        setText(text.toUpperCase());
        props.showAlert('Text converted to uppercase', 'success');
    }

    const handleLowerClick = () => {
        console.log('Lowercase cliked');
        setText(text.toLowerCase());
        props.showAlert('Text converted to lowercase', 'success');
    }

    const handleClearTextClick = () => {
        setText('');
        props.showAlert('Text cleared', 'success');
    }

    const handleCopyClick = () => {
        // const textVal = document.getElementById('myBox').value;
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
                <h1>{props.heading}</h1>
                {/* <label for="myBox" className="form-label">Example textarea</label> */}
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{
                    backgroundColor: props.mode === 'dark' ? '#042743' : 'white',
                    color: props.mode === 'dark' ? 'white' : '#042743'
                }} id="myBox" rows="8"></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleUpperClick}>Convert to Uppercase</button>
            <button className="btn btn-primary mx-2" onClick={handleLowerClick}>Convert to Lowercase</button>
            <button className="btn btn-primary mx-2" onClick={handleClearTextClick}>Clear Text</button>
            <button className="btn btn-primary mx-2" onClick={handleCopyClick}>Copy to clipboard</button>
            <button className="btn btn-primary mx-2" onClick={handleRemoveSpaceClick}>Remove Extra Space</button>
        </div>
        <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
            <h1>Your text summary</h1>
            <p>total words: {text.split(' ').length} & total characters: {text.length}</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
        </>
    )
}
