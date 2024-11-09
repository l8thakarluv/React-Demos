import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import NoteState from './contexts/notes/NoteState';
import AlertState from './contexts/alert/AlertState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  // const [alert, setAlert] = useState(null);
  // const showAlert = (message, type) => {
  //   setAlert({message, type});

  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 1500);
  // }
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message='My react app' />
          <div className="container">
            <Routes>
              <Route path='/' element={<Login />}></Route>
              <Route path='/home' element={<Home />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/signup' element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
