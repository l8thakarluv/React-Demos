import React, { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    // <div>{props.note.title + '=>' + props.note.description}</div>
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <div className='d-flex align-items-center'>
                    <h5 className="card-title">{props.note.title}</h5>
                    <i role='button' className="fa-regular fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
                    <i role='button' className="fa-regular fa-trash-can mx-2" onClick={() => deleteNote(note._id)}></i>
                </div>
                <p className="card-text">{props.note.description}</p>
                <p className="card-text">{props.note.tag}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem