import axios from "axios";

export const UpvoteDownvote = (quote_id:number, upvote:boolean, user_id_of_quote:number, user_id_of_person_liking:number) => {

  if (user_id_of_person_liking == user_id_of_quote){
    console.log("You can't vote for your own quote");
  }

  else if (upvote){
    axios.put(`vote/upvote/${quote_id}`)
    .catch(error => {
      console.error(error);
    });
  }

  else{
    axios.put(`vote/downvote/${quote_id}`)
    .catch(error => {
      console.error(error);
    });
  }
  window.location.reload();
};