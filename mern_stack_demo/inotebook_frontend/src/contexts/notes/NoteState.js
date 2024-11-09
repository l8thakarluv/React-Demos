import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesData = [];
  const [notes, setNotes] = useState(notesData);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("auth-token", localStorage.getItem('token'));

  // Get all notes
  const getAllNotes = async (req, res) => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: 'GET',
      headers
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a note
  const addNote = async (noteData) => {
    // with API Call    
    const addedNote = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',
      headers,
      body: JSON.stringify(noteData)
    });

    const resJson = await addedNote.json();

    // without API Call
    // const note = {
    //   "_id": "66e421d906397159bb0f5ec6",
    //   "title": noteData.title,
    //   "description": noteData.description || "",
    //   "tag": noteData.tag || "",
    //   "user": "66d58d41d18dc9c655b113db",
    //   "date": "2024-09-13T11:28:25.509Z",
    //   "createdAt": "2024-09-13T11:28:25.509Z",
    //   "updatedAt": "2024-09-13T11:28:25.509Z",
    //   "__v": 0
    // };
    setNotes(notes.concat(resJson));
  }

  // Update a note
  const updateNote = async (note) => {
    // API call
    const response = await fetch(`${host}api/notes/updatenote/${note._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({title: note.title, description: note.description, tag: note.tag})
    });
    response.json();

    // deep clone notes array to update state & display updated note in real time without calling API
    const newNotes = JSON.parse(JSON.stringify(notes));

    // logic to edit in client
    const noteIndexToBeUpdated = newNotes.findIndex(element => element._id === note._id);
    if (noteIndexToBeUpdated > -1) {
      newNotes[noteIndexToBeUpdated].title = note.title;
      newNotes[noteIndexToBeUpdated].description = note.description;
      newNotes[noteIndexToBeUpdated].tag = note.tag;
    }

    setNotes(newNotes);
  }

  // Delete a note
  const deleteNote = async (id) => {
    //with API call
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers
    });

    const json = await response.json();

    //Without API call updating state
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;