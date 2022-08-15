import React from 'react';
import Footer from "./Footer";

const Menu = () => {
    return (
        <nav className = 'navbar navbar-light bg-dark'>
        <form className = 'form-inline'>
            <button className="btn btn-outline-success" type="button">Main button></button>
            <button className="btn btn-outline-success" type="button">Users></button>
        </form>

        </nav>
    )

}
export default Menu