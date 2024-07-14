import Navbar from "./navbar"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpForm() {
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;

        const userData = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
        }
        console.log(`username ${username} password ${password} firstname ${firstname} lastname ${lastname}`);

        fetch('https://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .catch((err) => console.log(err))

    }

    return(
        <>
            <Navbar />
            <h1>Sign Up Form</h1>
            <form action="" method="POST">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password"/>
                <label htmlFor="firstname">First name</label>
                <input type="text" name="firstname" id="firstname"/>
                <label htmlFor="lastname">Last name</label>
                <input type="text" name="lastname" id="lastname"/>
                <input type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </>
    )
}

export default SignUpForm