import React from 'react';
import './App.css';
import Notes from './Components/notes/Notes';
import NewNote from './Components/new-notes/New-Note'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { db } from './Firebase'
// import { collection, getDocs } from 'firebase/firestore/lite';


function App() {

  // const [myNotes, setNotes] = useState([]);
  // const notesCollection = collection(db, 'myNotes')

  // useEffect(() => {
  //   const getNotes = async () => {
  //     const data = await getDocs(notesCollection)
  //     console.log(data);

  //   }
  //   getNotes()

  // }, []);

  return (<Router>


    <Routes>
      <Route path='/' exact element={<Notes />} />
      <Route path='/new-note' element={<NewNote />} />
    </Routes>

  </Router >

  );

}

export default App;
