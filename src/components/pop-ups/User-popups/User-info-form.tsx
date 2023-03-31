import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";

const UserInfoForm =  (props: {handleData: Function, changepass: Function, changeimg: Function, close: Function})  => {

    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (
            async () =>{
                try{
                    const {data} =(await axios.get('/auth/user'));
                    setEmail(data.email);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                }catch(err){
                    console.log(err);
                }
            }
        )();
      }, []);

      const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
    
        try{
            await axios.put('/user/update-info', {
                first_name,
                last_name,
                email
            });

            props.handleData();
        }
        catch(err){
            setErrorMessage("This email address is already in use!");
        }
        
      };

    return(
        <div className="profile-settings">
            
            <h4 className="profile-h4">Profile <span className="orange-text">settings</span></h4>
            <p>Change your profile settings</p>

            <form onSubmit={submit}>

                <label htmlFor="email"><p className='label-text'>Email</p></label>
                <input 
                  defaultValue={email}
                  type="email" 
                  id="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                  className="input-big"
                />
                
                <div className="name-surname-popup">
                    <div className="name-input-popup">
                        <label htmlFor="first-name"><p className='label-text'>First Name</p></label>
                        <input 
                        defaultValue={first_name}
                        type="text" 
                        id="first-name"
                        required
                        onChange={e => setFirstName(e.target.value)}
                        className='name-input-big input-big'
                        />
                    </div>
                    <div className="name-input-popup">
                        <label htmlFor="last-name"><p className='label-text'>Last Name</p></label>
                        <input 
                        defaultValue={last_name}
                        type="text" 
                        id="last-name"
                        required
                        onChange={e => setLastName(e.target.value)}
                        className='name-input-big input-big'
                        />
                    </div>
                </div>

                <div className='error-message'>{errorMessage}</div>

                <div className="name-surname-popup">
                    <button type="button" className="medium-button yellow-background" onClick={() => props.changepass()}>Change password</button>
                    <button type="button" className="medium-button orange-background" onClick={() => props.changeimg()}>Change profile picture</button>
                </div>
                
                <div className="flex-buttons">
                    <input type="submit" value="Submit" className='submit-button-small popup-button'/>
                    <p onClick={() => props.close("info")}>Cancel</p>
                </div>

            </form>

        </div>
    );
}

export default UserInfoForm;