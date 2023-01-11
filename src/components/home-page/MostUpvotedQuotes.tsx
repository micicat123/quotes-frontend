import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Quote } from "../../models/quote";

const MostUpvotedQuotes = (props: any) => {
    const [page, setPage] = useState(1);
    const [quotes, setQuotes] = useState<any>([]);

    useEffect(() => {


        axios.get(`/quote/paginated/${page}`)
        .then(response => {
            setQuotes(quotes.concat(response.data).sort((a: { score: number; },b: { score: number; }) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0)));
        })
        .catch(error => {
          console.error(error);
        });
      }, [page]);

    function loadMore(){
        setPage(page + 1);
    }

    if (props.NeedToLoadMore === false) {
        return(
            <>
                <h4 className="orange-text centered-text">Most upvoted quotes</h4>
                <p className="centered-text  p-under-h4">Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in your profile</p>
                
                <div className="quotes-layout">
                    {quotes.map((quote: Quote) => {
                        return (
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
                                        <img src="/pictures/profile-photo.png" alt="Image" className="profile-photo-small" />
                                        <p className="caption">{quote.user.first_name} {quote.user.last_name}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='center-div'>
                    <a href="/signup"><button className='button signup-button-wide'>Sign up to see more</button></a>
                </div>
            </>
        )              
    }

    return(
        <>
            <h4 className="orange-text centered-text">Most upvoted quotes</h4>
            <p className="centered-text  p-under-h4">Most upvoted quotes on the platform. Give a like to the ones you like to keep them saved in your profile.</p>
                
            <div className="quotes-layout">
                {quotes.map((quote :Quote) => {
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
            <div className='center-div'>
                <button onClick={loadMore} className='button load-more-button'>Load more</button>
            </div>  
        </>
    )
}

export default MostUpvotedQuotes;