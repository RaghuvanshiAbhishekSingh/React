import React, { Fragment } from "react";
import { CardGroup, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { ArrowsAngleExpand } from "react-bootstrap-icons";
import ReactHtmlParser from "react-html-parser";

function Taskbar(props) {
  const maximiseArticle = artical => {
    props.maximizeArticle(artical);
  };
  return (
    <Fragment>
      {props.articles ? (
        <CardGroup>
          {props.articles.map(artical => {
            return (
              <Card key={artical.id}>
                <Card.Header className="text-right">
                  <ArrowsAngleExpand onClick={() => maximiseArticle(artical)} />
                </Card.Header>
                <Card.Body>
                  <Card.Title>{artical.title}</Card.Title>
                  <Card.Text>{ReactHtmlParser(artical.body)}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted"></small>
                </Card.Footer>
              </Card>
            );
          })}
        </CardGroup>
      ) : (
        ""
      )}
    </Fragment>
  );
}
const mapStateToProps = state => {
  return { articles: state.allArticles };
};

const mapDispatchToProps = dispatch => {
  return {
    maximizeArticle: artical =>
      dispatch({
        type: "MAX_ARTICLE",
        payload: { maximizeArticle: artical }
      }),
    toggelDialogWithData: articleID =>
      dispatch({
        type: "TOGGEL_ARTICLE_POPUP",
        payload: true
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);
