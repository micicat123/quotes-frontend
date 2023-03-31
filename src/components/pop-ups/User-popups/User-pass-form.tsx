import axios from "axios";
import { SyntheticEvent, useState } from "react";

const UserPassForm =  (props: {handleData: Function, close:Function})  => {

    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswrodconfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try{
            await axios.put('/user/update-password', {
                old_password,
                password,
                password_confirm
            });

            props.handleData()
        }
        catch(err:any){
            setErrorMessage(err.response.data.message);
        }
        
        
      };

    return(
        <div className="profile-settings">
            <h4 className="profile-h4">Profile <span className="orange-text">settings</span></h4>
            <p>Change your password</p>
            <form onSubmit={submit}>

                <label htmlFor="old-pass"><p className='label-text'>Current password</p></label>
                <input 
                  type="password" 
                  id="old-pass"
                  required
                  onChange={e => setOldPassword(e.target.value)}
                  className="input-big"
                />
                
                <div>
                    <label htmlFor="pass"><p className='label-text'>New password</p></label>
                    <input 
                    type="password" 
                    id="pass"
                    required
                    onChange={e => setPassword(e.target.value)}
                    className='input-big'
                    />
                </div>
                <div>
                    <label htmlFor="new-pass"><p className='label-text'>Confirm new password</p></label>
                    <input 
                    type="password" 
                    id="new-pass"
                    required
                    onChange={e => setPasswrodconfirm(e.target.value)}
                    className='input-big'
                    />
                </div>

                <div className='error-message'>{errorMessage}</div>
                
                <div className="flex-buttons">
                    <input type="submit" value="Submit" className='submit-button-small popup-button'/>
                    <p onClick={() => props.close("pass")}>Cancel</p>
                </div>

            </form>

        </div>
    );
}

export default UserPassForm;