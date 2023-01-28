import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Popup from "reactjs-popup";

const CreateOrEditQuote =  (props:any)  => {

    const [quote, setQuote] = useState('');
    const [quoteIsOpen, setQuoteIsOpen] = useState(false); 
    const [Ischanged, setIsChanged] = useState(false); 

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (props.create) {
            await axios.post('/quote', {
                quote
            });
        }
        //add to edit quote but needs id
        else{
            await axios.put('/quote', {
                quote
            });
        }

        setIsChanged(true);
        setQuoteIsOpen(false);        
    };

    useEffect(() => {}, [Ischanged]);
    

    return(
        <>
            <button className="circle add-quote-circle" onClick={() => console.log(setQuoteIsOpen(o => !o))}></button>
            <Popup open={quoteIsOpen}>
                <div className="crete-update-quote">

                    {props.create ?
                        <> 
                            <h4 className="profile-h4">Are you feeling <span className="orange-text">inspired?</span></h4>
                            <p>You can post quotes. You can delete them on your profile.</p>
                        </>
                        :
                        <h4 className="profile-h4">Edit your <span className="orange-text">quote.</span></h4>
                    }         
                    
                    <form onSubmit={submit}>

                        <textarea required rows={4} onChange={e => setQuote(e.target.value)} className="input-big"/>
                        
                        <div className="name-surname flex-buttons">
                            <input type="submit" value="Submit" className='submit-button-small'/>
                        </div>

                    </form>
                </div>    
                <p onClick={() => setQuoteIsOpen(false)} className="cancel-text-create-quote">Cancel</p>
            </Popup> 

            <Popup open={Ischanged}>
                 <div className="confirmation-quote">
                    <h5 className="profile-h4 centered-text">Your <span className="orange-text">quote</span><span> was edited.</span></h5>
                    <div className="name-surname flex-button">
                        <input type="submit" value="Close" className='submit-button-small' onClick={() => {setIsChanged(false); window.location.reload();}}/>
                    </div>
                </div>    
            </Popup> 

        </>
    );
}

export default CreateOrEditQuote;