import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Quote } from "../../models/quote";
import MappedQuotes from "./MappedQuotes";

const MostRecentQuotes = () => {
    const [page, setPage] = useState(1);
    const [quotes, setQuotes] = useState<any>([]);

    useEffect(() => {
        axios.get(`/quote/most-recent/${page}`)
        .then(response => {
            setQuotes(quotes.concat(response.data));
        })
        .catch(error => {
          console.error(error);
        });
      }, [page]);

    function loadMore(){
        setPage(page + 1);
    }

    return(
        <>  
            <h4 className="orange-text centered-text">Most recent quotes</h4>
            <p className="centered-text  p-under-h4">Recent quotes updates as soon user adds new quote. Go ahed show them that you seen the new quote and like the ones you like.</p>
            <div className="quotes-layout">
                <MappedQuotes quotes = {quotes}/>
            </div>
            <div className='center-div'>
                <button onClick={loadMore} className='button load-more-button'>Load more</button>
            </div>  
        </>
    )
}

export default MostRecentQuotes;