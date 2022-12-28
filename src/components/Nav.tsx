import axios from "axios";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = (props: {user: User}) => {
    
    const logout = async () =>{
        await axios.post('/logout', {});
    }

    return(
        <nav className="">
            {props.user.email == '' ? //user is not logged in
                <a></a> 

            :window.location.href == 'url for signup' ? //user is on page signup
                <a></a>

            :window.location.href == 'url for login' ? //user is on page login
                <a></a>

            : //user is logged in
                <a ></a>
            }
            
            <a className="" href="">Company name</a>

            <ul className="">
                <Link to={'/profile'} className="">
                    {props.user.name}
                </Link>
                <Link to={'/logout'} className="" onClick={logout}>
                    Sign out
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;