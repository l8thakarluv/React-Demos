import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import NoteState from './contexts/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message='My react app' />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />}>
                Home
              </Route>
              <Route exact path='/about' element={<About />}>
                About
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
