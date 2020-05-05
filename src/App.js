import React,{useState} from "react";
import "./App.css";
import AddArticle from "./components/AddArticle";
import PublishedArticles from "./components/PublishedArticles";
import { Container, Nav } from "react-bootstrap";

function App() {
  const [tabActive, setActiveTab] = useState('addArticle')
  return (
    <Container fluid>
      <Nav justify variant="tabs" defaultActiveKey="addArticle" className="m-2">
        <Nav.Item>
          <Nav.Link eventKey="addArticle" onClick={()=>setActiveTab('addArticle')} href="#">Add Article</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="publishedArticle" onClick={()=>setActiveTab('publishedArticle')}>Published Articles</Nav.Link>
        </Nav.Item>
      </Nav>
      {
        tabActive === 'addArticle' ? ( <AddArticle /> ) : ( <PublishedArticles />)
      }
      
    </Container>
  );
}

export default App;
