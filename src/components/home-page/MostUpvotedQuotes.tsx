import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Quote } from "../../models/quote";

const MostUpvotedQuotes = (props: any) => {
    const [page, setPage] = useState(1);
    const [newQuotes, setNewQuotes] = useState([]);
    const [oldQuotes, setOldQuotes] = useState([]);

    useEffect(() => {

        setOldQuotes([...oldQuotes, ...newQuotes]);

        axios.get(`/quote/${page}`)
        .then(response => {
            setNewQuotes(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      }, []);

    /*
created_at: "2022-12-25T16:07:24.916Z"
downvotes: 0
quote: "Everything is in our mind!"
quote_id: 2
score: 1
upvotes: 1
    */
    if (props.NeedToLoadMore === false) {
        return(
            <div className="quotes-layout">
                {newQuotes.map((quote :Quote) => {
                            return(
                                <div className="quote-card" key={quote.quote_id}>
                                    <div className="voting">
                                        <i className="up-arrow arrow"></i>
                                        <p className="upvotes-number">{quote.upvotes}</p>
                                        <i className="down-arrow arrow"></i>
                                    
                                    </div>
                                    <div>
                                        <div>
                                            <p>{quote.quote}</p>
                                        </div>
                                        <div className="quote-author">
                                            <img src="/pictures/profile-photo.png" alt="Image" className="profile-photo-small"/>
                                            <p className="caption">{quote.user.first_name} {quote.user.last_name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                })}
            </div>
        )              
    }

    return(
        <div className="quotes-layout">
            {oldQuotes.map((quote :Quote) => {
                        return(
                            <div className="quote-card" key={quote.quote_id}>
                                <div className="voting">
                                    <i className="up-arrow arrow"></i>
                                    <p className="upvotes-number">{quote.upvotes}</p>
                                    <i className="down-arrow arrow"></i>
                                
                                </div>
                                <div className="quote">
                                    <div>
                                        <p>{quote.quote}</p>
                                    </div>
                                    <div className="quote-author">
                                        <img src="/pictures/profile-photo.png" alt="Image" className="profile-photo-small"/>
                                        <p className="caption">{quote.user.first_name} {quote.user.last_name}</p>
                                    </div>
                                </div>
                            </div>
                        )
            })}
            {newQuotes.map((quote :Quote) => {
                        return(
                            <div className="quote-card" key={quote.quote_id}>
                                <div className="voting">
                                    <i className="up-arrow arrow"></i>
                                    <p className="upvotes-number">{quote.upvotes}</p>
                                    <i className="down-arrow arrow"></i>
                                
                                </div>
                                <div>
                                    <div>
                                        <p>{quote.quote}</p>
                                    </div>
                                    <div className="quote-author">
                                        <img src="/pictures/profile-photo.png" alt="Image" className="profile-photo-small"/>
                                        <p className="caption">{quote.user.first_name} {quote.user.last_name}</p>
                                    </div>
                                </div>
                            </div>
                        )
            })}
        </div>   
    )
}

export default MostUpvotedQuotes;