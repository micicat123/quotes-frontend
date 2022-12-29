import axios from "axios";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = (props: {user: User}) => {
    
    const logout = async () =>{
        await axios.post('/logout', {});
    }

    return(
        <>
                {props.user.email == '' ? //user is not logged in
                <>
                    <nav>
                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <Link to={'/signup'}>
                                <button className="button signup-button"> Sign up </button>
                            </Link>
                            <Link to={'/login'}>
                                <button className="button login-button"> Log in </button>
                            </Link> 
                        </div>
                    </nav>    
                </>

                :window.location.href == 'url for signup' ? //user is on page signup
                <>
                    <nav>
                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <Link to={'/login'}>
                                <button className="button login-button"> Log in </button>
                            </Link> 
                        </div>
                    </nav>    
                </>    

                :window.location.href == 'url for login' ? //user is on page login
                <>
                    <nav>
                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <Link to={'/signup'}>
                                <button className="button signup-button"> Sign up </button>
                            </Link>
                        </div>
                    </nav>
                </>    

                :window.location.href == 'url for profile' ? //user is on profile page
                <>  
                    <nav className="profile-nav">
                        <img src="/pictures/logo-white.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <ul className="list">
                                <li>
                                    <Link to={'/'} className="nav-link-profile">
                                        <p>Home</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 24px'}}>
                                    <Link to={'/settings'} className="nav-link-profile">
                                        <p>Settings</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/logout'} className="nav-link-profile">
                                        <p>Logout</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 16px 0 32px'}}>
                                    <button className="circle profile-photo-circle"></button>
                                </li>
                                <li>
                                    <button className="circle add-quote-circle"></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </> 

                : //user is logged in
                <>  
                    <nav className="profile-nav">
                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <ul className="list">
                                <li>
                                    <Link to={'/'} className="nav-link">
                                        <p>Home</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 24px'}}>
                                    <Link to={'/settings'} className="nav-link">
                                        <p>Settings</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/logout'} className="nav-link">
                                        <p>Logout</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 16px 0 32px'}}>
                                    <button className="circle profile-photo-circle"></button>
                                </li>
                                <li>
                                    <button className="circle add-quote-circle"></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </>   
                }
        </>    
    )
}

export default Nav;