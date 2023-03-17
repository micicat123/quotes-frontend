import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/user";
import MenuPopup from "./pop-ups/Hamburger-menu";
import CreateOrEditQuote from "./pop-ups/Quote-popups/Create-or-edit-quote";
import Popups from "./pop-ups/User-popups/All-user-popups";

const Nav = (props: {user: User}) => {
    
    let navigate = useNavigate();
    const childRef = useRef<any>(null);
    
    const logout = async () =>{
        await axios.post('/auth/logout');
        navigate('/');
        window.location.reload();
    }

    function changePopups () {
        if (childRef && childRef.current) {
            childRef.current.openSettings();
        }
    }

    return(
        <>
            {window.location.pathname == '/signup' ? //user is on page signup
                <>
                    <nav>
                        <MenuPopup user="" logout={logout} openSettings={() => changePopups()} white={false}/>

                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <Link to={'/login'}>
                                <button className="button login-button"> <p className="button-text">Log in</p> </button>
                            </Link> 
                        </div>
                    </nav>    
                </>   

                :window.location.pathname == '/login' ? //user is on page login
                <>
                    <nav>
                        <MenuPopup user="" logout={logout} openSettings={() => changePopups()} white={false}/>

                        <img src="/pictures/logo-black.png" alt="logo" className="logo" />
                        <div className="nav-right">
                            <Link to={'/signup'}>
                                <button className="button signup-button"> <p className="button-text">Sign up</p> </button>
                            </Link>
                        </div>
                    </nav>
                </> 
            
               :props.user.email == ''? //user is not logged in
                <>
                {window.location.pathname != '/profile' ?
                            <nav>
                                <MenuPopup user="" logout={logout} openSettings={() => changePopups()} white={false}/>
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
                            :
                            <nav className="profile-nav">
                                <MenuPopup user="" logout={logout} openSettings={() => changePopups()} white={true}/>
                                <img src="/pictures/logo-white.png" alt="logo" className="logo" />
                                <div className="nav-right">
                                    <Link to={'/signup'}>
                                        <button className="button signup-button white-border"> <p className="button-text">Sign up</p> </button>
                                    </Link>
                                    <Link to={'/login'}>
                                        <button className="button login-button"> <p className="button-text">Log in</p> </button>
                                    </Link> 
                                </div>
                            </nav>
                        }
                </>   

                :window.location.pathname == '/profile' ? //user is on profile page
                <>  
                    <nav className="profile-nav">
                        <MenuPopup user={props.user.first_name + " " + props.user.last_name} logout={logout} openSettings={() => changePopups()} white={true}/>

                        <img src="/pictures/logo-white.png" alt="logo" className="logo logo-center" />
                        <div className="nav-right">
                            <ul className="list">
                                <li className="hide-nav">
                                    <Link to={'/'} className="nav-link-profile">
                                        <p className="profile-list">Home</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 24px'}} className="hide-nav">
                                    <Popups ref={childRef}/>
                                </li>    
                                <li className="hide-nav">
                                    <p className="white-text" onClick={logout}>Logout</p>
                                </li>
                                <li style={{padding:'0 16px 0 32px'}} className="hide-nav">
                                    <Link to={'/profile'} state={{ user: props.user }}>
                                        <button className="circle profile-photo-circle"></button>
                                    </Link>
                                </li>
                                <li>
                                    <CreateOrEditQuote create={true}/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </> 

                : //user is logged in
                <>  
                    <nav>
                        <MenuPopup user={props.user.first_name + " " + props.user.last_name} logout={logout} openSettings={() => changePopups()} white={false}/>

                        <img src="/pictures/logo-black.png" alt="logo" className="logo logo-center" />
                        <div className="nav-right">
                            <ul className="list">
                                <li className="hide-nav">
                                    <Link to={'/'} className="nav-link">
                                        <p>Home</p>
                                    </Link>
                                </li>
                                <li style={{padding:'0 24px'}} className="hide-nav">
                                    <Popups orange={true} ref={childRef}/>
                                </li>
                                <li className="hide-nav">
                                    <p onClick={logout} className="orange-text">Logout</p>
                                </li>
                                <li style={{padding:'0 16px 0 32px'}} className="hide-nav">
                                    <Link to={'/profile'} state={{ user: props.user }}>
                                        <button className="circle profile-photo-circle"></button>
                                    </Link>
                                </li>    
                                <li>
                                    <CreateOrEditQuote create={true}/>
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