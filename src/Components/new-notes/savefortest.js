import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import './new-note.css'
import { db } from '../../Firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore/lite';


export default function NewNote() {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const [myNotes, setNotes] = useState([]);
    const notesCollection = collection(db, 'myNotes')
    let data;

    // create new note
    const createNote = async () => {
        await addDoc(notesCollection, { title: newTitle, description: newDescription })
    }

    // update the note
    const updateNote = async (id, title, description) => {
        const updatedNote = doc(db, 'myNotes', id);
        const newField = { title: 'updates title2765' }
        await updateDoc(updatedNote, newField)
        console.log(data)
        data = await getDocs(notesCollection)
        console.log(data);
    }


    useEffect(() => {
        const getNotes = async () => {
            data = await getDocs(notesCollection)
            setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getNotes()

    }, []);

    return (
        <div className='new-note'>
            <h2>New Note</h2>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="title" onChange={(event) => {
                        setNewTitle(event.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" onChange={(event) => {
                        setNewDescription(event.target.value)
                    }} placeholder='description' rows={3} />
                </Form.Group>
                <Button onClick={createNote}>Save</Button>
            </Form>
            {myNotes.map((note) => {
                return <div>
                    <h1>{note.id}</h1>
                    <h2>{note.title}</h2>
                    <p>{note.description}</p>
                    <button onClick={() => { updateNote(note.id, note.title, note.description) }}>edit</button>
                    <button>delete</button>
                </div>
            })}
        </div>
    )
}

