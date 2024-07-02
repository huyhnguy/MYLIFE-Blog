import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useNavigate } from 'react-router-dom';

function LogInForm() {
    const [data, setData] = useState(null)

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(`username ${username} password ${password}`);

        fetch('http://localhost:3000/api/users/login', {
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
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data.token) {
                    window.localStorage.setItem("authorization", data.token);
                    window.localStorage.setItem("name", data.name);
                    let path = '/';
                    navigate(path);
                }
            })
    }

    return(
        <>
            <Navbar />
            <form action="" method="POST">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password"/>
                <input type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </>
    )
}

export default LogInForm