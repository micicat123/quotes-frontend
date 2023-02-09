import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";

const UserInfoForm =  (props: {handleData: Function, changepass: Function})  => {

    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

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
    
        await axios.put('/user/update-info', {
            first_name,
            last_name,
            email
        });
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
                
                <div className="name-surname">
                    <div>
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
                    <div>
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

                <div className="name-surname">
                    <button type="button" className="medium-button yellow-background" onClick={() => props.changepass()}>Change password</button>
                    <button type="button" disabled className="medium-button orange-background">Change profile picture</button>
                </div>
                
                <div className="name-surname flex-buttons">
                    <input type="submit" value="Submit" className='submit-button-small' onClick={() => props.handleData()}/>
                </div>

            </form>

        </div>
    );
}

export default UserInfoForm;