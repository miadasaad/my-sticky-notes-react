import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import './notes.css'
import { AiOutlinePlus, AiOutlineClose, AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { GiNotebook } from 'react-icons/gi'
import { db } from '../../Firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';



export default function Notes() {


    const [titleValue, setTitleValue] = useState('');
    const [desValue, setDesValue] = useState('');
    const [idValue, setIdValue] = useState('');
    ///////////
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const [myNotes, setNotes] = useState([]);
    const notesCollection = collection(db, 'myNotes')
    //let data;
    let data = useRef();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // create new note
    const createNote = async () => {
        await addDoc(notesCollection, { title: newTitle, description: newDescription })
        data = await getDocs(notesCollection)
        setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setShowResults(false)
    }
    // plus , close icon for create note
    const [showResults, setShowResults] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // update the note
    const updateNote = async (id) => {
        const updatedNote = doc(db, 'myNotes', id);
        const newField = { title: titleValue, description: desValue }
        await updateDoc(updatedNote, newField)
        data.current = await getDocs(notesCollection)
        setNotes(data.current.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setShowEdit(false)
    }

    // delete the note
    const deleteNote = async (id) => {
        const deletenote = doc(db, 'myNotes', id);
        await deleteDoc(deletenote)
        data.current = await getDocs(notesCollection)
        setNotes(data.current.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const getNotes = async () => {
        data.current = await getDocs(notesCollection)
        setNotes(data.current.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    useEffect(() => {

        getNotes()
    }, []);
    //////////


    // plus , close icon for editing note
    const onClick = () => setShowResults(true)
    const hideNote = () => setShowResults(false)
    /// appear and edit my note
    const EditNote = (note) => {
        setShowEdit(true);
        setTitleValue(note.title)
        setDesValue(note.description)
        setIdValue(note.id)

    }
    const hideNote2 = () => setShowEdit(false)

    return <div className='main-page'>
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <div className='notes'>
                        <h2 className='heading' style={{ 'display': 'inline-block' }}>My Notes <GiNotebook></GiNotebook></h2>
                        <Button onClick={onClick} className='add addbutton'><AiOutlinePlus></AiOutlinePlus></Button>
                        {myNotes.map((note) => {
                            return <div className='note-style' key={note.id}>
                                <div className='dropping'>
                                    <Button className='drop' onClick={() => { EditNote(note) }}><AiOutlineEdit></AiOutlineEdit></Button>
                                    <Button className='drop' onClick={() => { deleteNote(note.id) }}><AiFillDelete></AiFillDelete></Button>
                                </div>


                                <h2>{note.title}</h2>
                                <p>{note.description}</p>
                            </div>
                        })}
                        {/* <div className='note-style'>
                            <div className='dropping'>
                                <Button className='drop' ><AiOutlineEdit></AiOutlineEdit></Button>
                                <Button className='drop' ><AiFillDelete></AiFillDelete></Button>
                            </div>

                            <h2>hello world</h2>
                            <p>just trying one note for testing</p>
                        </div> */}
                    </div>

                    {showResults ? <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <div className='new-note create'>
                                <h2>New Note</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="title" onChange={(event) => {
                                            setNewTitle(event.target.value)
                                        }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" placeholder='description' onChange={(event) => {
                                            setNewDescription(event.target.value)
                                        }} rows={3} />
                                    </Form.Group>
                                    <Button onClick={createNote}>Save</Button>
                                </Form>
                                <Button onClick={hideNote} className='add' ><AiOutlineClose></AiOutlineClose></Button>
                            </div>
                        </Col>
                    </Row> : null}
                    {showEdit ? <Row><Col md={{ span: 6, offset: 3 }}>
                        <div className='new-note edit'>
                            <h2 > Edit Note</h2 >
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" onChange={(event) => { setTitleValue(event.target.value) }} value={`${titleValue}`} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" onChange={(event) => { setDesValue(event.target.value) }} value={`${desValue}`} rows={3} />
                                </Form.Group>
                                <Button onClick={() => { updateNote(`${idValue}`) }}>Save edits</Button>
                            </Form>
                            <Button onClick={hideNote2} className='add' ><AiOutlineClose></AiOutlineClose></Button>
                        </div >
                    </Col></Row> : null}
                </Col>
            </Row>
        </Container>
    </div>
}

