import axios from "axios";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = (props: {user: User}) => {
    
    const logout = async () =>{
        await axios.post('/logout', {});
    }

    return(
        <nav>
            <ul>
                {props.user.email == '' ? //user is not logged in
                <>
                    <img src="/pictures/logo.png" alt="logo" className="logo" />
                    <Link to={'/profile'} className="">
                        {props.user.name}
                    </Link>
                    <Link to={'/logout'} className="" onClick={logout}>
                        Sign out
                    </Link> 
                </>    

                :window.location.href == 'url for signup' ? //user is on page signup
                <>
                    <Link to={'/profile'} className="">
                        {props.user.name}
                    </Link>
                    <Link to={'/logout'} className="" onClick={logout}>
                        Sign out
                    </Link> 
                </>    

                :window.location.href == 'url for login' ? //user is on page login
                <>
                    <Link to={'/profile'} className="">
                        {props.user.name}
                    </Link>
                    <Link to={'/logout'} className="" onClick={logout}>
                        Sign out
                    </Link> 
                </>    

                : //user is logged in
                <>
                    <Link to={'/profile'} className="">
                        {props.user.name}
                    </Link>
                    <Link to={'/logout'} className="" onClick={logout}>
                        Sign out
                    </Link> 
                </>    
                }
            </ul>
        </nav>    
    )
}

export default Nav;