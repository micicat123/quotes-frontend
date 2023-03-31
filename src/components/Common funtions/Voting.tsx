import axios from "axios";

export const UpvoteDownvote = async (quote_id:number, upvote:boolean, user_id_of_quote:number, user_id_of_person_liking:number, handleRerender:Function) => {

  if (user_id_of_person_liking == user_id_of_quote){
    console.log("You can't vote for your own quote");
    return;
  }

  else if (upvote){
    axios.put(`vote/upvote/${quote_id}`)
    .then(res => {
      handleRerender(quote_id, res.data.upvotes);
    })
    .catch(error => {
      console.error(error);
    });
  }

  else{
    axios.put(`vote/downvote/${quote_id}`)
    .then(res => {
      handleRerender(quote_id, res.data.upvotes);
    })
    .catch(error => {
      console.error(error);
    });
  }
};