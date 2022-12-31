import React, { Component, SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('/auth/login', {email, password});

    setRedirect(true);
  };

  if(redirect){
    return <Navigate to={'/'}/>
  }

    return (
      <Wrapper>  
        <div className='login-div'>
            <div className='login-text'>
                <h4 className='login-heading'>Welcome <span className='orange-text'>back!</span></h4>
                <p className='login-paragraph'>Thank you for coming back. Hope you have a good day and inspire others.</p>
            </div>
            <form onSubmit={submit} className='login-form'>
                <label htmlFor="email"><p className='label-text'>Email</p></label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <br />

                <label htmlFor="password"><p className='label-text'>Password</p></label>
                <input 
                  type="password" 
                  id="password"
                  placeholder="Password"
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <br />

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
