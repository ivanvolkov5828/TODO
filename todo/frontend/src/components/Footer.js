import React from 'react';
import { MDBContainer, MDBFooter } from "mdbreact";
import UserList from "./User";

const Footer = () => {
    return (
        <footer class='footer'>
        <MDBContainer fluid>
        <p align="center">&copy; {new Date().getFullYear()} Copyright: <a href="https://gb.ru"> GeekBrains </a></p>
        </MDBContainer>
        </footer>
    )

}

export default Footer