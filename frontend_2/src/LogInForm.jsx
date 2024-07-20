import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useNavigate } from 'react-router-dom';

function LogInForm({ loginFunction }) {
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const clearFormFields = () => {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (error) {setError(null)};

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch('https://unleashed-pool-ticket.glitch.me/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then(response => {
                if (response.status === 401) {
                    return 'The username and password you entered does not match any account. Please try again.'
                } 
                
                return response.json();
            })
            .then((data) => {
                if (data === 'The username and password you entered does not match any account. Please try again.') {
                    setError(data);
                }

                if (data.token) {
                    window.localStorage.setItem("token", data.token);
                    window.localStorage.setItem("full_name", data.full_name);
                    clearFormFields();
                    let path = '/';
                    navigate(path);
                    handleClose();
                    loginFunction();
                }
            })
    }

    const handleClose = () => {
        const loginForm = document.querySelector("#login-form");
        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
        if (error) {setError(null)};
        loginForm.close();
    }

    const handleGuest = () => {
        if (error) {setError(null)};

        fetch('https://unleashed-pool-ticket.glitch.me/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'guest',
                password: 'guest',
            })
        })
            .then(response => {
                if (response.status === 401) {
                    return 'The username and password you entered does not match any account. Please try again.'
                } 
                
                return response.json();
            })
            .then((data) => {
                if (data === 'The username and password you entered does not match any account. Please try again.') {
                    setError(data);
                }

                if (data.token) {
                    window.localStorage.setItem("token", data.token);
                    window.localStorage.setItem("full_name", data.full_name);
                    clearFormFields();
                    let path = '/';
                    navigate(path);
                    handleClose();
                    loginFunction();
                }
            })
    }

    return(
        <>
            <dialog className="login-form" id="login-form">
                <header>
                    <h1>Log In</h1>
                    <button className="close-button" onClick={handleClose}>&#x274c;</button>
                </header>
                <form action="" method="POST">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"/>
                    { error && <p className="login-error">{error}</p> }
                    <input type="submit" value="Submit" onClick={handleSubmit} className="submit-button"/>
                </form>
                <hr />
                <div className='guest-section'>
                    <p>Not a member? <a href="/signup">Create an Account</a></p>
                    <p>Don't want to create an account?</p>
                    <button onClick={handleGuest}>Log in as guest</button>
                </div>

            </dialog>
        </>
    )
}

export default LogInForm