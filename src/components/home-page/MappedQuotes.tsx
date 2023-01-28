import axios from "axios";
import { useEffect, useState } from "react";
import { Quote } from "../../models/quote";
import { User } from "../../models/user";

const MappedQuotes = (props: any) => {

    const [user, setUser] = useState(new User());

    useEffect(() => {
        (
          async () =>{
            try{
              const {data} = await axios.get('/auth/user'); //get authenticated user by jwt token 
              setUser(new User(
                data.user_id,
                data.first_name,  
                data.last_name,
                data.email,
                data.password
              ))
            }catch(err){
              console.log("Couldn't get authenticated user!");}
          }
        )();
      }, []);

    if (props.quotes.length > 1){
        return(  
            <>
                {props.quotes.map((quote: Quote) => {
                    return (
                       <div className="quote-card" key={quote.quote_id}>
                            <div className="voting">
                                <i className="up-arrow arrow"></i>
                                <p className="upvotes-number">{quote.upvotes}</p>
                                <i className="down-arrow arrow"></i>
                            </div>
                            <div className="quote-and-author">
                                <div>
                                    <p>{quote.quote}</p>
                                </div>
                                <div className="quote-author">
                                    <img src="/pictures/profile-photo.png" alt="Image" className="profile-photo-small" />
                                    <p className="caption">{quote.user.first_name} {quote.user.last_name}</p>
                                </div>
                            </div>
                            <div className="quote-settings">
                                <img src="/pictures/edit-quote.png" alt="Image" className="edit-remove-icon edit-icon" />
                                <img src="/pictures/delete-quote.png" alt="Image" className="edit-remove-icon" />
                            </div>
                        </div>
                    );
                })}
            </>
        )
    }

    return <></>
}

export default MappedQuotes;