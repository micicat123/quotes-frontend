import { useState } from "react";
import Popup from "reactjs-popup";
import UserInfoForm from "./User-info-form";
import UserPassForm from "./User-pass-form";

const UserPopups =  (props:any)  => {

    const [infoIsOpen, setInfoIsOpen] = useState(false);
    const [passIsOpen, setPassIsOpen] = useState(false);
    const [changedIsOpen, setChangedIsOpen] = useState(false);

    const confirmation = () => {
        setChangedIsOpen(true);
        setInfoIsOpen(false);
        setPassIsOpen(false)
    }

    const switchToPassword = () => {
        setInfoIsOpen(false);
        setPassIsOpen(true);
    }

    return(
        <>
            {/*INFO SETTINGS*/}
            {props.orange == true ?
                <>
                    <p onClick={() => setInfoIsOpen(o => !o)} className="profile-list orange-text">Settings</p>
                    <Popup open={infoIsOpen}>
                        <UserInfoForm handleData={confirmation} changepass={switchToPassword}/>
                        <p onClick={() => setInfoIsOpen(o => !o)} className="cancel-text">Cancel</p>
                    </Popup>
                </> 
                : 
                <>
                    <p onClick={() => setInfoIsOpen(o => !o)} className="profile-list">Settings</p>
                    <Popup open={infoIsOpen}>
                        <UserInfoForm handleData={confirmation} changepass={switchToPassword}/>
                        <p onClick={() => setInfoIsOpen(o => !o)} className="cancel-text">Cancel</p>
                    </Popup>
                </> 
            }

            {/*PASSWORD SETTINGS*/}
            <Popup open={passIsOpen}>
                <UserPassForm handleData={confirmation}/>
                <p onClick={() => setPassIsOpen(false)} className="cancel-text-password">Cancel</p>   
            </Popup>

            {/*CONFIRMATION*/}
            <Popup open={changedIsOpen}>
                 <div className="profile-settings-changed">
                    <h4 className="profile-h4">Profile <span className="orange-text">settings</span></h4>
                    <p>Your settings are saved</p>         
                    <div className="name-surname flex-buttons">
                        <input type="submit" value="Close" className='submit-button-small' onClick={() => {setChangedIsOpen(false); window.location.reload();}}/>
                    </div>
                </div>    
            </Popup> 

        </>
    );
}

export default UserPopups;