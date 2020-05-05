import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";

class ArticleDialogBox extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.state = {
      quillText: "",
      id: 0
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.maximizeArticle.id !== prevState.id) {
      return {
        quillText: nextProps.maximizeArticle.body,
        id: nextProps.maximizeArticle.id
      };
    }

    return null;
  }

  handleQuillChange = value => {
    this.setState({ quillText: value });
  };

  saveData = () => {
    const { quillText, id } = this.state;
    const { value } = this.titleInputRef.current;
    this.setState({ id: "" });
    this.props.saveData({ id, body: quillText, title: value });
  };

  onHide = () => {
    this.props.toggelDialog();
  };

  render() {
    const { quillText } = this.state;

    return (
      <>
        <Modal
          show={this.props.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.title ? this.props.title : "Heading"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <input
                defaultValue={this.props.maximizeArticle.title}
                type="text"
                className="form-control"
                ref={this.titleInputRef}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Body>
            <ReactQuill value={quillText} onChange={this.handleQuillChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onHide}>Close</Button>
            <Button onClick={this.saveData}>Minimize</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    maximizeArticle: state.maximizeArticle,
    show: state.showArticlePopup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveData: data =>
      dispatch({
        type: "ARTICLE_ACTION",
        payload: { data }
      }),
    toggelDialog: () =>
      dispatch({
        type: "TOGGEL_ARTICLE_POPUP",
        payload: false
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDialogBox);
