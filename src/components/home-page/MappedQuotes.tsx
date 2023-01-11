import { Quote } from "../../models/quote";

const MappedQuotes = (props: any) => {
    return(
        <div className="quotes-layout">
            {props.quotes.map((quote: Quote) => {
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
    ) 
}

export default MappedQuotes;