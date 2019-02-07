import axios from "axios";
import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  APIKEY + "&q=";
class Articles extends Component {
  state = {
    articles: [],
    term: "",
    recnum: "5",
    startYr: "",
    endYr: ""
  };

  componentDidMount() {
    //this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, headline: "", byline: "", abstract: "" }
          )
      )
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term && this.state.recnum) {
        //call the NYT API here
        var strQuery = this.state.term + "&" + this.state.startYr + "0101" + "&" + this.state.endYr + "0101";
        console.log(strQuery);

        console.log(BASEURL+strQuery);
        
        axios.get(BASEURL + strQuery).then( data => {
          
          const newArray = data.data.response.docs.map((item, i) => {
            return {
              id: i,
              byline: item.pub_date,
              abstract: item.web_url,
              headline: item.snippet
            }
          })
          this.setState({ articles: newArray, term: "", recnum: "", startYr: "", endYr: "" });
          
        })
       
        
      }    
  };



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>NYT Search API</h3>
            </Jumbotron>
            <form>
              <Input
                value={this.state.term}
                onChange={this.handleInputChange}
                name="term"
                placeholder="Subject Term (required)"
              />
              <Input
                value={this.state.recnum}
                onChange={this.handleInputChange}
                name="recnum"
                placeholder="Number of Results (ex. 5)"
              />
              <Input
                value={this.state.startYr}
                onChange={this.handleInputChange}
                name="startYr"
                placeholder="Start Year: 1999 (Optional)"
              />
              <Input
                value={this.state.endYr}
                onChange={this.handleInputChange}
                name="endYr"
                placeholder="End Year: 1999 (Optional)"
              />
              <FormBtn
                disabled={!(this.state.term && this.state.recnum)}
                onClick={this.handleFormSubmit}
              >
                Search Articles
              </FormBtn>
            </form>
          </Col>
          </Row>
          <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>Articles from NYT Below</h3>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.headline}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.saveArticle(article)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h4>Run Search for Results</h4>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
