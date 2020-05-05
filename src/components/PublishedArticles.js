import React, { Component, Fragment } from "react";
import { Row, Col, ListGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

class PublishedArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      filterArticles: []
    };
  }

  filterArticles = e => {
    const { value } = e.target;
    let allArticles = this.props.articles;
    let filterArticles = allArticles.filter(artical => {
      if (artical.title.toLowerCase().includes(value.toLowerCase())) {
        return artical;
      }
      return null;
    });
    this.setState({ searchText: value, filterArticles });
  };
  render() {
    const { filterArticles, searchText } = this.state;
    return (
      <Fragment>
        <Row>
          <Col md="12" xs="12" className="text-center m-4">
            <h1>Published Articals</h1>
          </Col>
        </Row>
        <Row className="content-center-published-articals">
          <ListGroup>
            <ListGroup.Item>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={e => this.filterArticles(e)}
              />
            </ListGroup.Item>
            {filterArticles.length && searchText.length ? (
              filterArticles.map(artical => {
                return (
                  <ListGroup.Item key={artical.id}>
                    <b>Title : </b>
                    {artical.title} <br />
                    <b>Body : </b>
                    {ReactHtmlParser(artical.body)}
                  </ListGroup.Item>
                );
              })
            ) : filterArticles.length === 0 && searchText.length ? (
              <ListGroup.Item>NO SEARCH RESULT</ListGroup.Item>
            ) : (
              this.props.articles.map(artical => {
                return (
                  <ListGroup.Item key={artical.id}>
                    <b>Title : </b>
                    {artical.title} <br />
                    <b>Body : </b>
                    {ReactHtmlParser(artical.body)}
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { articles: state.allArticles };
};

const mapDispatchToProps = dispatch => {
  return {
    toggelDialog: () =>
      dispatch({
        type: "TOGGEL_ARTICLE_POPUP",
        payload: true
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishedArticles);
