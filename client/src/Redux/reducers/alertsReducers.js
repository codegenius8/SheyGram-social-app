const initialState = {
    loading : false,
    likeorunlikeloading : false,
    addcommentloading : false,
    followloading : false,
    unfollowloading : false,
    deleteloading : false
   
}
export const alertsReducers = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case "LOADING": 
      return {
          ...state,
          loading : action.payload
      };


      case "LIKE_UNLIKE_LOADING": 
      return {
          ...state,
          likeorunlikeloading : action.payload
      };



      case "ADD_COMMENT_LOADING": 
      return {
          ...state,
          addcommentloading : action.payload
      };

      case "FOLLOW_LOADING": 
      return {
          ...state,
          followloading : action.payload
      };

      case "UNFOLLOW_LOADING": 
      return {
          ...state,
          unfollowloading : action.payload
      };

      case "DELETE_LOADING": 
      return {
          ...state,
          deleteloading : action.payload
      };

   
    

    default:
      return state;
  }
};
