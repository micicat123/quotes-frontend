import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Quote } from "../../models/quote";
import MappedQuotes from "./MappedQuotes";

const MostUpvotedQuotes = (props: any) => {
    const [page, setPage] = useState(1);
    const [quotes, setQuotes] = useState<any>([]);

    useEffect(() => {


        axios.get(`/quote/paginated/${page}`)
        .then(response => {
            setQuotes(quotes.concat(response.data).sort((b: { score: number; },a: { score: number; }) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0)));
        })
        .catch(error => {
          console.error(error);
        });
      }, [page]);

    function loadMore(){
        setPage(page + 1);
    }

    console.log(quotes);
    if (props.NeedToLoadMore === false) {
        return(
            <>
                <h4 className="orange-text centered-text">Most upvoted quotes</h4>
                <p className="centered-text  p-under-h4">Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in your profile</p>
                <MappedQuotes quotes = {quotes}/>
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
            <MappedQuotes quotes = {quotes}/>
            <div className='center-div'>
                <button onClick={loadMore} className='button load-more-button'>Load more</button>
            </div>  
        </>
    )
}

export default MostUpvotedQuotes;