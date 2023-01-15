import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Quote } from "../../models/quote";
import MappedQuotes from "./MappedQuotes";

const MostRecentQuotes = () => {
    const [page, setPage] = useState(1);
    const [quotes, setQuotes] = useState<any>([]);

    useEffect(() => {


        axios.get(`/quote/paginated/${page}`)
        .then(response => {
            setQuotes(quotes.concat(response.data).sort((a: { created_at: string; },b: { created_at: string; }) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0)));
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
            <h4 className="orange-text centered-text">Most upvoted quotes</h4>
            <p className="centered-text  p-under-h4">Most upvoted quotes on the platform. Give a like to the ones you like to keep them saved in your profile.</p>
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