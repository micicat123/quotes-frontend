import React, { Component, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';

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
        <h2>Daily Sales</h2>
        <div id='chart'/>
      </Wrapper>
    )
}

export default LandingPage;
