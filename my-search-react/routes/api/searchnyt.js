import axios from "axios";

const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  APIKEY + "&q=";


export default {
  searchnyt: function(query) {
  	console.log("in search function");
    var searchTerm = query.term;
    var beginDate = query.startYr;
  	var endDate = query.endYr;

  	var strQuery = searchTerm + "&" + beginDate + "0101" + "&" + endDate + "0101";
  	console.log(strQuery);

  	console.log(BASEURL+strQuery);


    return axios.get(BASEURL + strQuery);

  }
};
