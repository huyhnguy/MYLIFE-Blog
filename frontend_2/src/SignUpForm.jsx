import Navbar from "./navbar"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpForm() {
    const [errorArray, setErrorArray] = useState(null);

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;

        const userData = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            firstname: firstname,
            lastname: lastname,
        }

        fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.errors) {
                    console.log(data.errors);
                    setErrorArray(data.errors);
                } 

                if (data.success) {
                    alert("You have signed up successfully. Please log in.")
                    let path = "/"
                    navigate(path);
                }
            })
            .catch((err) => console.log(err))

    }

    return(
        <>
            <Navbar />
            <h1 className="signup-title">Sign Up</h1>
            <form action="" method="POST" className="signup-form">
                <label htmlFor="signup-username">Username</label>
                <input type="text" name="signup-username" id="signup-username"/>
                <label htmlFor="signup-password">Password</label>
                <input type="password" name="signup-password" id="signup-password"/>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" id="confirm-password"/>
                <label htmlFor="firstname">First name</label>
                <input type="text" name="firstname" id="firstname"/>
                <label htmlFor="lastname">Last name</label>
                <input type="text" name="lastname" id="lastname"/>
                <input type="submit" value="Submit" onClick={handleSubmit} className="submit-button"/>
            </form>
            {errorArray && 
                <ul>
                    {errorArray.map(error => <li className="signup-error">{error.msg}</li>)}
                </ul>
            }
        </>
    )
}

export default SignUpForm