import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); // wheher dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message,
      type
    });
  }

  const removeClasses = () => {
    document.body.classList.remove('bg-light');
    document.body.classList.remove('bg-primary');
    document.body.classList.remove('bg-warning');
    document.body.classList.remove('bg-success');
    document.body.classList.remove('bg-danger');
  }

  const toggleMode = (clsName) => {
    removeClasses();
    document.body.classList.add('bg-'+clsName);
    if (mode === 'dark') {
      setMode('light');
      document.body.style.backgroundColor = '#fff';
      showAlert('Light mode is enabled', 'success');
    } else {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert('Dark mode is enabled', 'success');
    }
  }
  return (
    <>
    <Router>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route exact path="/about" element={<About mode={mode}/>} />
          <Route exact path="/" element={<TextForm heading="Try TextUtils - Word Counter, Character Counter, Remove Extra Spaces " mode={mode} showAlert={showAlert} />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
