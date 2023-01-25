import axios from "axios";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { User } from "../models/user";
import Popups from "./pop-ups/All-user-popups";
import UserSettings from "./pop-ups/User-info-form";

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
                                <button className="button signup-button"> <p className="button-text">Sign up</p> </button>
                            </Link>
                            <Link to={'/login'}>
                                <button className="button login-button"> <p className="button-text">Log in</p> </button>
                            </Link> 
                        </div>
                    </nav>    
                </>

                :window.location.href == 'http://localhost:3000/signup' ? //user is on page signup
                <>
                    <nav>
                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <Link to={'/login'}>
                                <button className="button login-button"> <p className="button-text">Log in</p> </button>
                            </Link> 
                        </div>
                    </nav>    
                </>    

                :window.location.href == 'http://localhost:3000/login' ? //user is on page login
                <>
                    <nav>
                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <Link to={'/signup'}>
                                <button className="button signup-button"> <p className="button-text">Sign up</p> </button>
                            </Link>
                        </div>
                    </nav>
                </>    

                :window.location.href == 'http://localhost:3000/profile' ? //user is on profile page
                <>  
                    <nav className="profile-nav">
                        <img src="/pictures/logo-white.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <ul className="list">
                                <li>
                                    <Link to={'/'} className="nav-link-profile">
                                        <p className="profile-list">Home</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 24px'}}>
                                    <Popups/>
                                </li>    
                                <li>
                                    <Link to={'/logout'} className="nav-link-profile">
                                        <p className="profile-list">Logout</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 16px 0 32px'}}>
                                    <Link to={'/profile'}>
                                        <button className="circle profile-photo-circle"></button>
                                    </Link>
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
                    <nav>
                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <ul className="list">
                                <li>
                                    <Link to={'/'} className="nav-link">
                                        <p>Home</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 24px'}}>
                                    <Popups orange={true}/>
                                </li>
                                <li>
                                    <Link to={'/logout'} className="nav-link">
                                        <p>Logout</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 16px 0 32px'}}>
                                    <Link to={'/profile'}>
                                        <button className="circle profile-photo-circle"></button>
                                    </Link>
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