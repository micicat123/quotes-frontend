import React, { Component, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {

    const [loggedIn, setLoggedin] = useState(false);

    return (
      <Wrapper>  
        <div className='login-div'>
            <div className='login-text'>
                <h4 className='login-heading'>Welcome <span className='orange-text'>back!</span></h4>
                <p className='login-paragraph'>Thank you for coming back. Hope you have a good day and inspire others.</p>
            </div>
            <form action="" className='login-form'>
                <label htmlFor="email"><p className='label-text'>Email</p></label>
                <input type="email" id="email" /><br />

                <label htmlFor="password"><p className='label-text'>Password</p></label>
                <input type="password" id="password"/><br />

                <input type="submit" value="Login" className='submit-button'/>
                <p>Dont have account?<span className='right-text'><a href="/signup" className='alternative-text'>Sign up</a></span></p>
            </form>
            <div>
            </div>
        </div>
      </Wrapper>
    )
}

export default Login;
