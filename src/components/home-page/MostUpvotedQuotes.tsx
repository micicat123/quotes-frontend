import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import MappedQuotes from "./MappedQuotes";

const MostUpvotedQuotes = (props: any) => {
    const [page, setPage] = useState(1);
    const [quotes, setQuotes] = useState<any>([]);

    useEffect(() => {


        axios.get(`quote/most-upvoted/${page}`)
        .then(response => {
            setQuotes(quotes.concat(response.data));
        })
        .catch(error => {
          console.error(error);
        });
      }, [page]);

    if (props.NeedToLoadMore === false) {
        return(
            <>
                <h4 className="orange-text centered-text">Most upvoted quotes</h4>
                <p className="centered-text  p-under-h4">Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in your profile</p>
                <div className="quotes-layout">
                    <MappedQuotes quotes = {quotes}/>
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
                <MappedQuotes quotes = {quotes}/>
            </div>
            <div className='center-div'>
                <button onClick={() => {setPage(page + 1)}} className='button load-more-button'>Load more</button>
            </div>  
        </>
    )
}

export default MostUpvotedQuotes;