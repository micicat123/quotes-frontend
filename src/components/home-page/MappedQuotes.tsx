import axios from "axios";
import { useEffect, useState } from "react";
import { Quote } from "../../models/quote";
import { User } from "../../models/user";
import CreateOrEditQuote from "../pop-ups/Quote-popups/Create-or-edit-quote";
import DeleteQuote from "../pop-ups/Quote-popups/Delete-quote";

const MappedQuotes = (props: any) => {

    const [user, setUser] = useState(new User());
    const [decisions, setDecisions] = useState([]);
    let status = 1;


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
              ));

              setDecisions(await (await axios.get('/quote/user-decisions')).data);
            }catch(err){}
          }
          
        )();
      }, []);   

    const getStatus = (quote_id:number) => {
        decisions.map((d:any) => {
            if (quote_id == d.quote.quote_id) {
                status = d.decision;
                return 0;
            } 
            status = 1;
        });
    };  

    if (props.quotes.length > 1){
        return(  
            <>
                {props.quotes.map((quote: Quote) => {

                    getStatus(quote.quote_id);

                    return (
                       <div className="quote-card" key={quote.quote_id}>
                            <div className="voting">
                                {status == 0 ?
                                    <>
                                        <i className="up-arrow arrow"></i>
                                        <p className="upvotes-number">{quote.upvotes}</p>
                                        <i className="down-arrow orange-arrow"></i>
                                    </>    
                                    :status == 2?
                                    <>
                                        <i className="up-arrow orange-arrow"></i>
                                        <p className="upvotes-number">{quote.upvotes}</p>
                                        <i className="down-arrow arrow"></i>
                                    </>
                                    :
                                    <>
                                        <i className="up-arrow arrow"></i>
                                        <p className="upvotes-number">{quote.upvotes}</p>
                                        <i className="down-arrow arrow"></i>
                                    </>

                                }
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
                                {user.first_name == quote.user.first_name && user.last_name == quote.user.last_name?
                                    <>
                                        <CreateOrEditQuote create={false} quote={quote.quote} quote_id={quote.quote_id}/>
                                        <DeleteQuote quote_id={quote.quote_id}/>
                                    </>
                                    :
                                    <></>
                                }
                                
                            </div>
                        </div>
                    );
                })}
            </>
        )
    }
    else if (props.quotes.length == 1){
        getStatus(props.quotes[0].quote.quote_id);
        return(
            <div className="quote-card" key={props.quotes[0].quote.quote_id}>
                <div className="voting">
                    {status == 0 ?
                        <>
                            <i className="up-arrow arrow"></i>
                            <p className="upvotes-number">{props.quotes[0].quote.upvotes}</p>
                            <i className="down-arrow orange-arrow"></i>
                        </>    
                        :status == 2?
                        <>
                            <i className="up-arrow orange-arrow"></i>
                            <p className="upvotes-number">{props.quotes[0].quote.upvotes}</p>
                            <i className="down-arrow arrow"></i>
                        </>
                        :
                        <>
                            <i className="up-arrow arrow"></i>
                            <p className="upvotes-number">{props.quotes[0].quote.upvotes}</p>
                            <i className="down-arrow arrow"></i>
                        </>

                    }
                </div>
                <div className="quote-and-author">
                    <div>
                        <p>{props.quotes[0].quote.quote}</p>
                    </div>
                    <div className="quote-author">
                        <img src="/pictures/profile-photo.png" alt="Image" className="profile-photo-small" />
                        <p className="caption">{props.quotes[0].user.first_name} {props.quotes[0].user.last_name}</p>
                    </div>
                </div>
                <div className="quote-settings">
                    {user.first_name == props.quotes[0].user.first_name && user.last_name == props.quotes[0].user.last_name?
                        <>
                            <CreateOrEditQuote create={false} quote={props.quotes[0].quote.quote} quote_id={props.quotes[0].quote.quote_id}/>
                            <DeleteQuote quote_id={props.quotes[0].quote.quote_id}/>
                        </>
                        :
                        <></>
                    }
                    
                </div>
            </div>
        )
    }

    return <></>
}

export default MappedQuotes;