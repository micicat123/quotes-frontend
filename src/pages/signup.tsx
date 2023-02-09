import { SyntheticEvent, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Signup = () => {

  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('/user', {
        first_name,
        last_name,
        email,
        password,
        password_confirm
    });

    setRedirect(true);
  };

  if(redirect){
    return <Navigate to={'/login'}/>
  }

    return (
      <Wrapper>  
        <div className='login-div'>
            <div className='login-text'>
                <h4 className='login-heading'>What is your <span className='orange-text'>name?</span></h4>
                <p className='login-paragraph'>Your name will appear on quotes and your public profle.</p>
            </div>
            <div>
                <img src="/pictures/profile-photo.png" alt="Image" className='register-photo'/>
            </div>
            <form onSubmit={submit}>
                <label htmlFor="email"><p className='label-text'>Email</p></label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  onChange={e => setEmail(e.target.value)}
                  className="input-small"
                />
                <br />
                <div className='name-surname'>
                  <div>
                    <label htmlFor="first-name"><p className='label-text'>First name</p></label>
                    <input
                      type="text" 
                      id="first-name" 
                      required
                      className='name-input input-small'
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name"><p className='label-text'>Last name</p></label>
                    <input 
                      type="text" 
                      id="last-name" 
                      required
                      className='name-input input-small'
                      onChange={e => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <label htmlFor="password"><p className='label-text'>Password</p></label>
                <input 
                  type="password" 
                  id="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                  className="input-small"
                />
                <br />

                <label htmlFor="password-confirm"><p className='label-text'>Confirm password</p></label>
                <input 
                  type="password" 
                  id="password-confirm"
                  required
                  onChange={e => setPasswordConfirm(e.target.value)}
                  className="input-small"
                />
                <br />

                <input type="submit" value="Sign up" className='signup-button-wide'/>

                <p>Already have an account?<span className='right-text'><a href="/login" className='alternative-text'>Sign in</a></span></p>
            </form>
            <div>
            </div>
        </div>
      </Wrapper>
    )
}

export default Signup;
