import { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MostUpvotedQuotes from '../components/home-page/MostUpvotedQuotes';
import MostRecentQuotes from '../components/home-page/MostRecentQuotes';
import MappedQuotes from '../components/home-page/MappedQuotes';

const LandingPage = () => {

    const [loggedIn, setLoggedin] = useState(false);
    const [randomQuote, setRandomQuote] = useState<any>({
        user: {
            first_name: '',
            last_name: ''
        }
    });

    useEffect(() => {
        (
            async () =>{
                try{
                    await axios.get('/auth/user'); //get authenticated user by jwt token 
                    setLoggedin(true);

                    setRandomQuote((await axios.get('/quote/random')).data);
                    
                }catch(err){
                    console.log(err);
                }
            }
        )();
      }, []);
 
    //user is logged in
    if (loggedIn){
        return(
            <Wrapper>  
                <>
                    <h4 className="orange-text centered-text">Quote of the day</h4>
                    <p className="centered-text  p-under-h4">Quote of the day is randomly choosen quote.</p> 

                    <div className='random-quote-div'>
                        <MappedQuotes quotes={[randomQuote]}/>
                    </div>  
                </>
                <MostUpvotedQuotes NeedToLoadMore={true}/>
                <MostRecentQuotes/>
            </Wrapper>
        )
    }

    //user is not logged in
    return (
      <Wrapper>  
        <div className='index-div'>
            <div className='first-flex-item'>
                <h1 className='welcome-heading'>Welcome <br /><span className='no-wrap'>to <span className='orange-text'>Quotastic</span></span></h1>
                <h5 className='welcome-paragraph'>Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.</h5>
                <Link to={'/signup'}>
                    <button className="button signup-button-landing"> <p  className='button-text'>Sign up</p></button>
                </Link>  
            </div> 
            <div className='second-flex-item'>
                <img src="/pictures/quotes-home.png" alt="Image" className='landing-page-picture'/>
            </div>             
        </div>
        <div className='index-div2'>
            <h2 className='explore-heading centered-text'>Explore the world of <br /><span className='orange-text'>fantastic quotes</span></h2>
        </div>
        <MostUpvotedQuotes NeedToLoadMore={false}/>
      </Wrapper>
    )
}

export default LandingPage;
