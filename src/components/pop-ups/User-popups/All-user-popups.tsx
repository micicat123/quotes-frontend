import { forwardRef, useState, useImperativeHandle } from "react";
import Popup from "reactjs-popup";
import UploadImage from "./User-image-form";
import UserInfoForm from "./User-info-form";
import UserPassForm from "./User-pass-form";

const UserPopups =  forwardRef((props:any, ref)  => {
    
    const [infoIsOpen, setInfoIsOpen] = useState(false);
    const [passIsOpen, setPassIsOpen] = useState(false);
    const [changedIsOpen, setChangedIsOpen] = useState(false);
    const [imageIsOpen, setImageIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({

        openSettings() {
          setInfoIsOpen(true);
        }
    
      }));

    const confirmation = () => {
        setChangedIsOpen(true);
        setInfoIsOpen(false);
        setPassIsOpen(false);
        setImageIsOpen(false);
    }

    const switchToPassword = () => {
        setInfoIsOpen(false);
        setPassIsOpen(true);
    }
    const switchToImage = () => {
        setInfoIsOpen(false);
        setImageIsOpen(true);
    }

    function closePopup(name:string) {
        switch (name) {
            case "info":
                setInfoIsOpen(false);
                break;
            case "pass":
                setPassIsOpen(false);
                break;
            case "image":
                setImageIsOpen(false);
                break;
        }
        setInfoIsOpen(false);
    }

    return(
        <>
            {/*INFO SETTINGS*/}
            {props.orange == true ?
                <>
                    <p onClick={() => setInfoIsOpen(true)} className="profile-list orange-text">Settings</p>
                </> 
                : 
                <>  
                    <p onClick={() => setInfoIsOpen(true)} className="profile-list">Settings</p>
                </> 
            }
            <Popup open={infoIsOpen} className="user-popup" onClose={() => setInfoIsOpen(false)}>
                <UserInfoForm handleData={confirmation} changepass={switchToPassword} changeimg={switchToImage} close={closePopup}/>
            </Popup>

            {/*PASSWORD SETTINGS*/}
            <Popup open={passIsOpen} className="user-popup" onClose={() => setPassIsOpen(false)}>
                <UserPassForm handleData={confirmation} close={closePopup}/>  
            </Popup>

            {/*IMAGE SETTINGS*/}
            <Popup open={imageIsOpen} className="user-popup" onClose={() => setImageIsOpen(false)}>
                <UploadImage handleData={confirmation} image={props.image} user={props.user} close={closePopup}/>
            </Popup>

            {/*CONFIRMATION*/}
            <Popup open={changedIsOpen} className="user-popup" onClose={() => setChangedIsOpen(false)}>
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
});

export default UserPopups;