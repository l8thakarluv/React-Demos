import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../contexts/alert/alertContext';

const Signup = () => {
    const [userData, setUserData] = useState({name: "", email: "", password: ""});
    const alertContextObj = useContext(alertContext);
    const { showAlert } = alertContextObj;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = userData;
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        });

        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/login');
            showAlert('User registered successfully!!', 'success');

        } else {
            showAlert('Invalid details!!!', 'danger');
        }
    }

    const onChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }

  return (
    <div className='container mt-2'>
        <h2>Register on iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name='name' id="name" onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength="8" required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength="8" required />
            </div>
            <button type="submit" className="btn btn-primary">Sign-up</button>
        </form>
    </div>
  )
}

export default Signup