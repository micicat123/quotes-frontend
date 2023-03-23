import  { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import MappedQuotes from '../components/home-page/MappedQuotes';
import { User } from '../models/user';

const Profilepage = () => {

    const [user, setUser] = useState<any>(new User());
    const [page, setPage] = useState(1);
    const [quotesUserLiked, setQuotesUserLiked] = useState<any>([]);
    const [usersMostLikedQuotes, setUsersMostLikedQuotes] = useState<any>([]);
    const [usersQuotes, setUsersQuotes] = useState<any>([]);
    const [statistics, setStatistics] = useState<any>();
    const [redirect, setRediect] = useState(false);
    const [image, setImage] = useState<string>('pictures/unset-profile-picture.png');

    const location = useLocation();

    useEffect(() => {
        setUser(location.state.user);
      }, []);

    useEffect(() => {
        if (user.first_name != '') {
            (async () =>{
                try{
                    setStatistics(await (await axios.get(`/user/statistics/${user.user_id}`)).data);
                    setUsersQuotes(usersQuotes.concat((await axios.get(`/user/quotes/${page}/${user.user_id}`)).data));
                    setQuotesUserLiked(quotesUserLiked.concat((await axios.get(`/user/quotes-liked/${page}/${user.user_id}`)).data));
                    setUsersMostLikedQuotes(usersMostLikedQuotes.concat((await axios.get(`/user/most-liked-quotes/${page}/${user.user_id}`)).data));
                
                }catch(err){
                    console.log(err);
                    setRediect(true);
                }   

                try{
                    const response = await axios.get(`uploads/picture/${user.user_id}`, {
                        responseType: 'blob',
                      });
                      setImage(URL.createObjectURL(response.data));
                }catch(err){
                    console.log(err);
                }   
              }
            )();
        }
      }, [page, user]);

    function loadMore(){
        setPage(page + 1);
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <Wrapper>  
            <>
                <div className='upper-profile-page'>
                    <div className='center-div'> 
                        <img src={image} className='profile-photo-large uploaded-profile-image' alt="" />
                        <h4 className='name-surname-big'>{user.first_name} {user.last_name}</h4>
                    </div>
                    <div className='statistics'>
                        <div style={{flex:"1"}}>
                            <p className='statistics-text'>Quotes</p> 
                            <h5 className='orange-text statistics-number'>
                                {statistics != undefined ?
                                    statistics[0][0].count
                                    :<></>
                                }
                            </h5>                          
                        </div>
                        <div style={{flex:"1"}}>
                            <p className='statistics-text'>Quotastic karma</p> 
                            <h5 className='statistics-number'>
                                {statistics != undefined ?
                                    statistics[1][0].count
                                    :<></>
                                }
                            </h5>                          
                        </div>
                    </div>
                </div>
                <div className='lower-profile-page'>
                    <div className='profile-quotes'>
                        <h5 className='orange-text profile-h5'>Most liked quotes</h5>
                        <MappedQuotes quotes={usersMostLikedQuotes}/>
                    </div>
                    <div className='center-div hidden-button'>
                        <button onClick={loadMore} className='button load-more-button'>Load more</button>
                    </div>  

                    <div className='profile-quotes middle-quotes'>
                        <h5 className='profile-h5'>Most recent</h5>
                        <MappedQuotes quotes={usersQuotes}/>
                    </div>
                    <div className='center-div hidden-button'>
                        <button onClick={loadMore} className='button load-more-button'>Load more</button>
                    </div>  

                    <div className='profile-quotes'>
                        <h5 className='profile-h5'>Liked</h5>
                        <MappedQuotes quotes={quotesUserLiked}/>
                    </div>
                </div>
                <div className='center-div'>
                    <button onClick={loadMore} className='button load-more-button'>Load more</button>
                </div>  
            </>
        </Wrapper>
    )
}

export default Profilepage;
