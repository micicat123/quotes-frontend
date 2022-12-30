import React, { Component, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LandingPage = () => {

    const [loggedIn, setLoggedin] = useState(false);


    useEffect(() => {
        (
            async () =>{
                try{
                    const {data} = await axios.get('/user'); //get authenticated user by jwt token 
                    setLoggedin(true);
                }catch(err){
                    console.log("User is not logged in.");
                }
            }
        )();
      }, []);

    //user is logged in  
    if (loggedIn){
        return(
            <>
            </>
        )
    }

    //user is not logged in
    return (
      <Wrapper>  
        <div className='index-div'>
            <div className='first-flex-item'>
                <h1 className='welcome-heading'>Welcome<br/> to <span className='orange-text'>Quotastic</span></h1>
                <h5 className='welcome-paragraph'>Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.</h5>
                <Link to={'/signup'}>
                    <button className="button signup-button"> <p  className='button-text'>Sign up</p></button>
                </Link>  
            </div> 
            <div className='second-flex-item'>
                <img src="/pictures/quotes-home.png" alt="Image" className="" />
            </div>             
        </div>
      </Wrapper>
    )
}

export default LandingPage;
