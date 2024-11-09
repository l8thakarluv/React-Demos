import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import alertContext from '../contexts/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const notesContext = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getAllNotes, updateNote } = notesContext;

  const [note, setNote] = useState({Id: '', title: '', description: '', tag: ''})

  // empty array means call useeffect only once on init
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const editNote = (currentNote) => {
    dialogRef.current.click();
    setNote(currentNote);
  }

  const handleClick = (e) => {
    e.preventDefault(); // prevents page from reloading on click of submit type of button
    updateNote(note);
    closeRef.current.click();
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <button type="button" ref={dialogRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                  <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="title" name="title" aria-describedby="title" value={note.title} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required />
                  </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={!note.title.length || !note.description.length}>Update note</button>
            </div>
          </div>
        </div>
      </div>

      <AddNote />
      <div className='my-3 row'>
        <h1>Your notes</h1>
        <div className="container mx-2">
        { notes.length == 0 && 'No notes to display!!' }
        </div>
        {
          notes.map(note => <NoteItem key={note._id} updateNote={editNote} note={note} />)
        }
      </div>
    </>
  )
}

export default Notes