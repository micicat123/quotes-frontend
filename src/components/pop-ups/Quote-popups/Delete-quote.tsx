import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Popup from "reactjs-popup";

const DeleteQuote =  (props:any)  => {

    const [IsOpen, setIsOpen] = useState(false); 
    const [Ischanged, setIsChanged] = useState(false);
    
    useEffect(() => {}, [Ischanged]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await axios.delete(`/quote/${props.quote_id}`).then(() => {
            setIsChanged(true);
            setIsOpen(false);
        }).catch((error) => console.log(error));

        
    };

    return(
        <>
            <img src="/pictures/delete-quote.png" alt="Image" className="edit-remove-icon" onClick={() => setIsOpen(true)}/>

            <Popup open={IsOpen} className="quote-popup" onClose={() => setIsOpen(false)}>
                <div className="crete-update-quote">
                    <h4 className="profile-h4">Are you sure?</h4>        
                    <p>You can post quotes. You can delete them on your profile.</p>
                    <div className="flex-buttons">
                        <input type="submit" value="Delete" className='submit-button-small' onClick={submit}/>
                    </div>
                </div>    
                <p onClick={() => setIsOpen(false)} className="cancel-text-create-delete">Cancel</p>
            </Popup> 

            <Popup open={Ischanged} className="confirm-popup" onClose={() => setIsChanged(false)}>
                 <div className="confirmation-quote">
                    <h5 className="profile-h4 centered-text">Your <span className="orange-text">quote</span><span> was deleted.</span></h5>
                    <div className="flex-buttons">
                        <input type="submit" value="Close" className='submit-button-small centered-text' onClick={() => {setIsChanged(false); window.location.reload();}}/>
                    </div>
                </div>    
            </Popup> 

        </>
    );
}

export default DeleteQuote;