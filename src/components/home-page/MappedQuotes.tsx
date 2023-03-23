import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Quote } from "../../models/quote";
import { User } from "../../models/user";
import { UpvoteDownvote } from "../Common funtions/Voting";
import CreateOrEditQuote from "../pop-ups/Quote-popups/Create-or-edit-quote";
import DeleteQuote from "../pop-ups/Quote-popups/Delete-quote";

const MappedQuotes = (props: any) => {

    const [user, setUser] = useState(new User());
    const [decisions, setDecisions] = useState([]);
    let status = 1;
    let image = 'pictures/unset-profile-picture.png';
    const [mappedData, setMappedData] = useState<React.ReactNode[]>([]);
    
    useEffect(() => {
        (
          async () =>{
            try{
              const {data} = await axios.get('/auth/user'); //get authenticated user by jwt token 
              await setUser(new User(
                data.user_id,
                data.first_name,  
                data.last_name,
                data.email,
                data.password,
                data.picture
              ));

              setDecisions(await (await axios.get('/quote/user-decisions')).data);
            }catch(err){}
          }
        )();  
      }, [props.quotes]);   

      useEffect(() => {
        (
            async function fetchData() {
            
                if (props.quotes.length > 0 && props.quotes[0].user.first_name != ''){
                    setMappedData(await Promise.all(props.quotes.map(async (quote: Quote) => {
                        getStatus(quote.quote_id);
                        const image = await getUsersPicture(quote.user.user_id, quote.user.picture);
                        return (
                            <div className="quote-card" key={quote.quote_id}>
                                <div className="voting">
                                    {status == 0 ?
                                        <>
                                            <i className="up-arrow arrow" onClick={() => UpvoteDownvote(quote.quote_id, true, quote.user.user_id, user.user_id)}></i>
                                            <p className="upvotes-number">{quote.upvotes}</p>
                                            <i className="down-arrow orange-arrow" onClick={() => UpvoteDownvote(quote.quote_id, false, quote.user.user_id, user.user_id)}></i>
                                        </>    
                                        :status == 2?
                                        <>
                                            <i className="up-arrow orange-arrow" onClick={() => UpvoteDownvote(quote.quote_id, true, quote.user.user_id, user.user_id)}></i>
                                            <p className="upvotes-number">{quote.upvotes}</p>
                                            <i className="down-arrow arrow" onClick={() => UpvoteDownvote(quote.quote_id, false, quote.user.user_id, user.user_id)}></i>
                                        </>
                                        :
                                        <>
                                            <i className="up-arrow arrow" onClick={() => UpvoteDownvote(quote.quote_id, true, quote.user.user_id, user.user_id)}></i>
                                            <p className="upvotes-number">{quote.upvotes}</p>
                                            <i className="down-arrow arrow" onClick={() => UpvoteDownvote(quote.quote_id, false, quote.user.user_id, user.user_id)}></i>
                                        </>
            
                                    }
                                </div>
                                    <div className="quote-and-author">
                                        <p>{quote.quote}</p>
                                        <Link to={'/profile'} state={{ user: quote.user }} className="nav-link-profile">
                                            <div className="quote-author">
                                                <img src={image} alt="Image" className="profile-photo-small" />
                                                <p className="caption">{quote.user.first_name} {quote.user.last_name}</p>
                                            </div>
                                        </Link>
                                    </div>
                                <div className="quote-settings">
                                    {user.first_name == quote.user.first_name && user.last_name == quote.user.last_name?
                                        <>
                                            <CreateOrEditQuote create={false} quote={quote.quote} quote_id={quote.quote_id}/>
                                            <DeleteQuote quote_id={quote.quote_id}/>
                                        </>
                                        :<></>
                                    }
                                    
                                </div>
                            </div>
                        );
                    })));
                }
            }         
        )();
    }, [props.quotes]);
    

    const getStatus = (quote_id:number) => {
        let stopMapping = false;

        decisions.map((d: any) => {
            if (stopMapping) {
                return;
            }

            if (quote_id == d.quote.quote_id) {
                status = d.decision;
                stopMapping = true;
                return;
            }
            
            status = 1;  
        });
    }; 

    const getUsersPicture = async (user_id:number, image: string) => {
        if (image && user_id){
            try{
                const response = await axios.get(`uploads/picture/${user_id}`, {
                    responseType: 'blob',
                  });
                  return URL.createObjectURL(response.data);
            }catch(err){}
        }  
        return 'pictures/unset-profile-picture.png';
    }

    return(  
        <>
            {mappedData}  
        </>
    )

}

export default MappedQuotes;