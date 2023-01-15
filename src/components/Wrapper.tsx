import axios from 'axios';
import { connect } from 'react-redux';
import { Dispatch, useEffect, useState } from 'react'
import Nav from './Nav'
import { User } from '../models/user';
import { Navigate } from 'react-router-dom';
import Footer from './Footer';

const Wrapper = (props:any) => {

  const [user, setUser] = useState(new User());

    useEffect(() => {
      (
          async () =>{
              try{
                  const {data} = await axios.get('/auth/user'); //get authenticated user by jwt token 
                  setUser(new User(
                    data.user_id,
                    data.first_name,  
                    data.last_name,
                    data.email,
                    data.password
                ))
              }catch(err){
                  console.log("Couldn't get authenticated user!");
              }
          }
      )();
    }, []);

    return (
      <>
        <Nav user={user}/>
          <main className="">
              {props.children}  
          </main>
        <Footer/>
      </>
    )
}

export default Wrapper;
