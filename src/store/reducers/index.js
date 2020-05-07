const initialState = {
  allArticles: [
    
  ],
  maximizeArticle: { id: 0, body: "", title: "" },
  showArticlePopup: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "MAX_ARTICLE":
      return {
        ...state,
        maximizeArticle: action.payload.maximizeArticle,
        showArticlePopup: true
      };

    case "ARTICLE_ACTION":
      const { id } = action.payload.data;
      let updatedArticles = [];
      if (id) {
        let {allArticles} = state;
        updatedArticles = allArticles.map((article)=>{
          if(article.id === id){
            return action.payload.data;
          }
          return article;
        });
      } else {
        action.payload.data.id = id ? id : new Date().getTime();
        updatedArticles = [...state.allArticles, action.payload.data]
      }
      
      return {
        ...state,
        allArticles: updatedArticles,
        showArticlePopup: false,
        maximizeArticle: { id: 0, body: "", title: "" }
      };

    case "TOGGEL_ARTICLE_POPUP":
      return {
        ...state,
        showArticlePopup: action.payload,
        maximizeArticle: { id: 0, body: "", title: "" }
      };

    default:
      return state;
  }
}

export default rootReducer;
