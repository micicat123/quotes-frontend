import { useState } from "react";
import Popup from "reactjs-popup";

const UserSettings =  () => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    return(
        <Popup>
        <div className="profile-settings">
            <h4>Profile <span className="orange-text">settings</span></h4>
            <p>Change your profile settings</p>
            <form>

                <label htmlFor="email"><p className='label-text'>Email</p></label>
                <input 
                  type="email" 
                  id="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                /> <br />

                <label htmlFor="first-name"><p className='label-text'>First Name</p></label>
                <input 
                  type="text" 
                  id="first-name"
                  required
                  onChange={e => setFirstName(e.target.value)}
                />

                <label htmlFor="last-name"><p className='label-text'>Last Name</p></label>
                <input 
                  type="text" 
                  id="last-name"
                  required
                  onChange={e => setLastName(e.target.value)}
                />

                <input type="submit" value="Submit" className='submit-button'/>

            </form>

        </div>
        </Popup>
    );
}

export default UserSettings;