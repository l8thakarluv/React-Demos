import React, { useContext, useState } from 'react';
import noteContext from '../contexts/notes/noteContext';

const AddNote = () => {
    const notesContext = useContext(noteContext);
    const { addNote } = notesContext;
    
    const [note, setNote] = useState({title: '', description: '', tag: ''})

    const handleClick = (e) => {
        e.preventDefault(); // prevents page to reload from click event of submit type button
        addNote(note);
        setNote({title: '', description: '', tag: ''});
    }

    // setting control values & getting it for the form to set in the state
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="title" onChange={onChange} minLength={5} value={note.title} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} value={note.description} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} minLength={5} value={note.tag} required />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={!note.title.length || !note.description.length}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote