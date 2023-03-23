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
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('pictures/unset-profile-picture.png');	

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        setFile(file);
        setPreviewImage(URL.createObjectURL(file));
    }
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
        formData.append('image', file);
    }

    try{
      await axios.post('/user', {
        first_name,
        last_name,
        email,
        password,
        password_confirm
      });

      await axios.post(`uploads/${email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setRedirect(true);
    }
    catch(err:any){
      console.error(err);
      setErrorMessage(err.response.data.message);
    }
  };

  if(redirect){
    return <Navigate to={'/login'}/>
  }

    return (
      <Wrapper>  
        <div className='signup-div'>
            <div className='login-text'>
                <h4 className='login-heading'>What is your <span className='orange-text'>name?</span></h4>
                <p className='login-paragraph'>Your name will appear on quotes and your public profle.</p>
            </div>
            <div>
              <input type="file" onChange={handleFileChange} id="files" style={{display:"none"}}/>
              <label htmlFor="files"><img src={previewImage} alt="upload profile picture" width={80} height={80} className="uploaded-profile-image"/></label>
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
                  <div className='surname-input'>
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
                
                <div className='error-message'>{errorMessage}</div>

                <input type="submit" value="Sign up" className='signup-button-wide'/>
                
                <div className='text-under-form'>
                  <p className='inline'>Already have an account?</p>
                  <p className='inline second-text'><a href="/login" className='alternative-text'>Sign in</a></p>
                </div>
            </form>
            <div>
            </div>
        </div>
      </Wrapper>
    )
}

export default Signup;
