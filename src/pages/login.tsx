import { SyntheticEvent, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
      await axios.post('/auth/login', {email, password});
      setRedirect(true);
    }
    catch (err) {
      setErrorMessage("Username or password incorrect!");
    }
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
                  required
                  onChange={e => setEmail(e.target.value)}
                  className="input-small"
                />
                <br />

                <label htmlFor="password"><p className='label-text'>Password</p></label>
                <input 
                  type="password" 
                  id="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                  className="input-small"
                />
                
                <div className='error-message'>{errorMessage}</div>
                

                <input type="submit" value="Login" className='submit-button'/>

                  <div className='text-under-form'>
                    <p className='inline first-text'>Dont have account?</p>
                    <p className='inline second-text'><a href="/signup" className='alternative-text'>Sign up</a></p>
                  </div>
            </form>
            <div>
            </div>
        </div>
      </Wrapper>
    )
}

export default Login;
