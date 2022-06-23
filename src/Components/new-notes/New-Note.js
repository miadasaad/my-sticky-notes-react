// import React, { useState, useEffect } from 'react'
// import { Form, Button } from 'react-bootstrap'
// import './new-note.css'
// import { db } from '../../Firebase';
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';
// import { Link } from 'react-router-dom';


// export default function NewNote() {
//     const [newTitle, setNewTitle] = useState("");
//     const [newDescription, setNewDescription] = useState("");

//     const [myNotes, setNotes] = useState([]);
//     const notesCollection = collection(db, 'myNotes')
//     let data;

//     // create new note
//     const createNote = async () => {
//         await addDoc(notesCollection, { title: newTitle, description: newDescription })
//         data = await getDocs(notesCollection)
//         setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//     }

//     // update the note
//     const updateNote = async (id, title, description) => {
//         const updatedNote = doc(db, 'myNotes', id);
//         const newField = { title: 'updates title fimkhkjkj' }
//         await updateDoc(updatedNote, newField)
//         console.log(data)
//         data = await getDocs(notesCollection)
//         setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//         console.log(data);
//     }

//     // delete the note
//     const deleteNote = async (id) => {
//         const deletenote = doc(db, 'myNotes', id);
//         await deleteDoc(deletenote)
//         data = await getDocs(notesCollection)
//         setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//     }


//     useEffect(() => {
//         const getNotes = async () => {
//             data = await getDocs(notesCollection)
//             setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//         }
//         getNotes()

//     }, []);
//     console.log(myNotes)

//     return (
//         <div className='my-new-note'>
//             <p>New Note</p>
//             <p><Link to='/'>My Notes</Link></p>
//             <Form>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Control type="text" placeholder="title" onChange={(event) => {
//                         setNewTitle(event.target.value)
//                     }} />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                     <Form.Control as="textarea" onChange={(event) => {
//                         setNewDescription(event.target.value)
//                     }} placeholder='description' rows={3} />
//                 </Form.Group>
//                 <Button onClick={createNote}>Save</Button>
//             </Form>
//             {myNotes.map((note) => {
//                 return <div>
//                     <h1>{note.id}</h1>
//                     <h2>{note.title}</h2>
//                     <p>{note.description}</p>
//                     <button onClick={() => { updateNote(note.id, note.title, note.description) }}>edit</button>
//                     <button onClick={() => { deleteNote(note.id) }}>delete</button>
//                 </div>
//             })}
//         </div>
//     )
// }

