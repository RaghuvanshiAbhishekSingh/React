const initialState = {
  allArticles: [
    {
      id: 1,
      title: "First Artical",
      body:
        "Finally the component gets exported as List. List is the result of connecting the stateless component ConnectedList with the Redux store."
    },
    {
      id: 2,
      title: "Second Artical",
      body:
        "The Form component we're going to create is a bit more complex than List. It's a form for adding new items to our application and for that we'll use a JavaScript class."
    },
    {
      id: 3,
      title: "third Artical",
      body:
        "Disclaimer: this tutorial was born when React didn't have hooks yet. I could use a functional component here, but to avoid twisting the tutorial I'll stick with classes."
    },
    {
      id: 4,
      title: "Fourth Artical",
      body:
        "Finally the component gets exported as Form. Form is the result of connecting ConnectedForm with the Redux store."
    },
    {
      id: 5,
      title: "Fifth Artical",
      body:
        "Note: the first argument for connect must be null when mapStateToProps is absent like in our example. Or you'll get TypeError: dispatch is not a function."
    }
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
