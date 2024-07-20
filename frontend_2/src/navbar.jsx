import LogInForm from "./LogInForm"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "./assets/icon.png"

function Navbar() {
    const [login, setLogin] = useState(localStorage.getItem("token"));

    const navigate = useNavigate();

    const handleLogin = () => {
        const loginForm = document.querySelector("#login-form");
        loginForm.showModal();
    }

    const loginSuccess = () => {
        setLogin(true);
        let path = '/';
        navigate(path);
    }

    const handleLogout = () => {
        localStorage.clear();
        setLogin(false);
        let path = '/';
        navigate(path);
    }

    return(
        <>
            <section className="sticky-header">
                <header className="main-header">
                    <div className="invisible-div"></div>
                    <h1 className="website-title"><a href="/" className="logo"><img src={icon} alt="icon" className="icon"/>MYLIFE</a></h1>
                    { login ? <button className="login-button" onClick={handleLogout}>Logout</button> : <button className="login-button" onClick={handleLogin}>Login</button> }
                </header>
                <hr />
                <nav>
                    <ul className="navbar">
                        <li><a href="/">Posts</a></li>
                        <li><a href="/posts/unpublished">Unpublished Posts</a></li>
                        <li><a href="/posts/create">Create a Post</a></li>
                    </ul>
                </nav>
                <hr className="navbar-line"/>
            </section>

            <LogInForm loginFunction={loginSuccess} />
        </>

    )
}

export default Navbar