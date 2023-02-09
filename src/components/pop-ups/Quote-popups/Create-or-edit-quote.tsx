import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Popup from "reactjs-popup";

const CreateOrEditQuote =  (props:any)  => {

    const [quote, setQuote] = useState('');
    const [quoteIsOpen, setQuoteIsOpen] = useState(false); 
    const [Ischanged, setIsChanged] = useState(false);
    
    useEffect(() => {
        setQuote(props.quote);
      }, [Ischanged]);

      
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (props.create) {
            await axios.post('/quote', {
                quote
            });
        }
        else{
            await axios.put(`/quote/${props.quote_id}`, {
                quote
            });
            
        }

        setIsChanged(true);
        setQuoteIsOpen(false);        
    };
    

    return(
        <>
            {props.create ? 
                <button className="circle add-quote-circle" onClick={() => setQuoteIsOpen(o => !o)}></button>
                :
                <img src="/pictures/edit-quote.png" alt="Image" className="edit-remove-icon edit-icon" onClick={() => setQuoteIsOpen(o => !o)}/>
            }

            <Popup open={quoteIsOpen}>
                <div className="crete-update-quote">

                    {props.create ?
                        <> 
                            <h4 className="profile-h4">Are you feeling <span className="orange-text">inspired?</span></h4>
                            <p>You can post quotes. You can delete them on your profile.</p>
                        </>
                        :
                        <>
                            <h4 className="profile-h4">Edit your <span className="orange-text">quote.</span></h4>
                            <br />
                        </>    
                    }         
                    
                    <form onSubmit={submit}>

                        <textarea required rows={4} onChange={e => setQuote(e.target.value)} className="input-big" defaultValue={quote}/>
                        
                        <div className="name-surname flex-buttons">
                            <input type="submit" value="Submit" className='submit-button-small'/>
                        </div>

                    </form>
                </div>
                {props.create ?
                        <p onClick={() => setQuoteIsOpen(false)} className="cancel-text-create">Cancel</p>
                        :
                        <p onClick={() => setQuoteIsOpen(false)} className="cancel-text-edit">Cancel</p>
                    }  

            </Popup> 

            <Popup open={Ischanged}>
                 <div className="confirmation-quote">
                    {props.create ?
                        <h5 className="profile-h4 centered-text">Your <span className="orange-text">quote</span><span> was created.</span></h5>
                        :
                        <h5 className="profile-h4 centered-text">Your <span className="orange-text">quote</span><span> was edited.</span></h5>
                    }
                    <div className="name-surname flex-button">
                        <input type="submit" value="Close" className='submit-button-small' onClick={() => {setIsChanged(false); window.location.reload();}}/>
                    </div>
                </div>    
            </Popup> 

        </>
    );
}

export default CreateOrEditQuote;