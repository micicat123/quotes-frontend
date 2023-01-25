import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";


const UserPassForm =  (props: {handleData: Function})  => {

    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswrodconfirm] = useState('');


      const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await axios.put('/user/update-password', {
            old_password,
            password,
            password_confirm
        });
      };

    return(
        <div className="profile-settings">
            <h4 className="profile-h4">Profile <span className="orange-text">settings</span></h4>
            <p>Change your password</p>
            <form onSubmit={submit}>

                <label htmlFor="old-pass"><p className='label-text'>Current password</p></label>
                <input 
                  type="text" 
                  id="old-pass"
                  required
                  onChange={e => setOldPassword(e.target.value)}
                  className="input-big"
                />
                
                <div>
                    <label htmlFor="pass"><p className='label-text'>New password</p></label>
                    <input 
                    type="text" 
                    id="pass"
                    required
                    onChange={e => setPassword(e.target.value)}
                    className='input-big'
                    />
                </div>
                <div>
                    <label htmlFor="new-pass"><p className='label-text'>Confirm new password</p></label>
                    <input 
                    type="text" 
                    id="new-pass"
                    required
                    onChange={e => setPasswrodconfirm(e.target.value)}
                    className='input-big'
                    />
                </div>
                
                <div className="name-surname flex-buttons">
                    <input type="submit" value="Submit" className='submit-button-small' onClick={() => props.handleData()}/>
                </div>

            </form>

        </div>
    );
}

export default UserPassForm;