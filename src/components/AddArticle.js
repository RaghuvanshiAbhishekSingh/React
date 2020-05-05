import React, { Component, Fragment } from "react";
import { Button, Row, Col } from "react-bootstrap";
import ArticleDialogBox from "./ArticleDialogBox";
import Taskbar from "./Taskbar";
import { connect } from "react-redux";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md="12" xs="12" className="text-center m-4">
            <h1>Add Artical</h1>
          </Col>
        </Row>
        <div className="content-center">
          <Button onClick={this.props.toggelDialog}>
            Open Article dialog box
          </Button>
        </div>
        <ArticleDialogBox title={"Add Article dialog"} />
        <Taskbar />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggelDialog: () =>
      dispatch({
        type: "TOGGEL_ARTICLE_POPUP",
        payload: true
      })
  };
};

export default connect(null, mapDispatchToProps)(AddArticle);
