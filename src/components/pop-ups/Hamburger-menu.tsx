import { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

const MenuPopup =  (props:{user:String, logout:Function, openSettings:Function})  => {

    const [isOpen, setIsOpen] = useState(false);
    
    return(
        <>        
            <div className="hamburger-menu" onClick={() => setIsOpen(o => !o)}>
                <div className="menu-icon"></div>
                <div className="menu-icon"></div>
                <div className="menu-icon"></div>
            </div>

            <Popup open={isOpen} className="popup-menu">
                {props.user == '' ?
                    <>
                        <div className="big-menu-popup">
                            <div className="hamburger-menu-item">
                                    <Link to={'/'} className="nav-link-profile">
                                        <h5 className="menu-text">Home</h5>
                                    </Link>
                                <div>
                                    <i className="arrow right-arrow"></i>
                                </div>
                            </div>
                            <Link to={'/signup'}>
                                <button className="button signup-button-nohide"> <p className="button-text">Sign up</p> </button>
                            </Link>
                            <Link to={'/login'}>
                                <button className="button login-button-nohide"> <p className="button-text">Log in</p> </button>
                            </Link> 
                        </div>
                    </>
                    : 
                    <div className="big-menu-popup">
                        <div className="name-and-photo-in-menu">
                            <Link to={'/profile'}>
                                <button className="circle profile-photo-circle"></button>
                            </Link>
                            <h5 className="menu-text">{props.user}</h5>
                        </div>
                        <div className="hamburger-menu-item">
                                <Link to={'/'} className="nav-link-profile">
                                    <h5 className="menu-text">Home</h5>
                                </Link>
                            <div>
                                <i className="arrow right-arrow"></i>
                            </div>
                        </div>
                        <div className="hamburger-menu-item">
                            <h5 className="menu-text" onClick={() => {props.openSettings(); setIsOpen(false)}}>Settings</h5>
                            <div>
                                <i className="arrow right-arrow"></i>
                            </div>
                        </div>
                        <div className="hamburger-menu-item">
                            <h5 className="menu-text orange-text">Logout</h5>
                            <div>
                                <i className="arrow right-arrow orange-arrow"></i>
                            </div>
                        </div>
                    </div>
                }
            </Popup>
        </> 
    );
}

export default MenuPopup;