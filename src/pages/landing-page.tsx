import React, { Component, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MostUpvotedQuotes from '../components/home-page/MostUpvotedQuotes';

const LandingPage = () => {

    const [loggedIn, setLoggedin] = useState(false);

    useEffect(() => {
        (
            async () =>{
                try{
                    await axios.get('/auth/user'); //get authenticated user by jwt token 
                    setLoggedin(true);
                }catch(err){
                    console.log(err);
                }
            }
        )();
      }, []);

    //user is logged in  
    if (loggedIn){
        return(
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
                        <img src="/pictures/quotes-home.png" alt="Image"/>
                    </div>             
                </div>
            </Wrapper>
        )
    }

    //user is not logged in
    return (
      <Wrapper>  
        <div className='index-div'>
            <div className='first-flex-item'>
                <h1 className='welcome-heading'>Welcome to <span className='orange-text'>Quotastic</span></h1>
                <h5 className='welcome-paragraph'>Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.</h5>
                <Link to={'/signup'}>
                    <button className="button signup-button"> <p  className='button-text'>Sign up</p></button>
                </Link>  
            </div> 
            <div className='second-flex-item'>
                <img src="/pictures/quotes-home.png" alt="Image"/>
            </div>             
        </div>
        <div className='index-div2'>
            <h2 className='explore-heading centered-text'>Explore the world of <span className='orange-text'>fantastic quotes</span></h2>
        </div>
            <h4 className="orange-text centered-text">Most upvoted quotes</h4>
            <p className="centered-text  p-under-h4">Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in your profile</p>
        <MostUpvotedQuotes NeedToLoadMore={false}/>
      </Wrapper>
    )
}

export default LandingPage;
